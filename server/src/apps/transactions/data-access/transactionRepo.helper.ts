import mongoose from 'mongoose';
import { TransactionType, UpdateQuery } from '../domain/dto';
import UserModel from '@apps/users/data-access/user.modal';

export const toObjectId = (id: string | mongoose.Types.ObjectId) => {
  if (id instanceof mongoose.Types.ObjectId) {
    return id;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }
  return new mongoose.Types.ObjectId(id);
};

interface BalanceUpdateAction {
  accountId: mongoose.Types.ObjectId;
  delta: number;
}

export function getBalanceUpdates(
  oldTxn: TransactionType,
  updated: UpdateQuery
): BalanceUpdateAction[] {
  const updates: BalanceUpdateAction[] = [];

  const oldAmount = oldTxn.amount;
  const newAmount = updated.amount ?? oldTxn.amount;

  const oldAccount = oldTxn.account!;
  const newAccount = updated.account ?? oldAccount;

  const oldType = oldTxn.type;
  const newType = updated.type ?? oldType;

  const oldToAccount = oldTxn.toAccount;
  const newToAccount = updated.toAccount ?? oldToAccount;

  const hasChanges =
    newAmount !== oldAmount ||
    newAccount.toString() !== oldAccount.toString() ||
    newType !== oldType ||
    (newToAccount &&
      oldToAccount &&
      newToAccount.toString() !== oldToAccount.toString()) ||
    (!newToAccount && oldToAccount) ||
    (newToAccount && !oldToAccount);

  // Remove from old account if changed
  if (hasChanges) {
    // Reverse old effect
    updates.push(...getReverseBalanceActions(oldTxn));

    // Apply new effect
    const mergedTxn = {
      ...oldTxn,
      ...updated,
      account: toObjectId((updated.account ?? oldTxn.account).toString()),
      toAccount: updated.toAccount
        ? toObjectId(updated.toAccount.toString())
        : oldTxn.toAccount,
    };
    updates.push(...getApplyBalanceActions(mergedTxn));
  }

  return updates;
}

function getReverseBalanceActions(txn: TransactionType): BalanceUpdateAction[] {
  switch (txn.type) {
    case 'expense':
      return [{ accountId: txn.account!, delta: txn.amount }];
    case 'income':
      return [{ accountId: txn.account!, delta: -txn.amount }];
    case 'transfer':
      if (!txn.toAccount) {
        throw new Error('toAccount missing for transfer transaction');
      }
      return [
        { accountId: txn.account!, delta: txn.amount },
        { accountId: txn.toAccount!, delta: -txn.amount },
      ];
    default:
      return [];
  }
}

function getApplyBalanceActions(txn: TransactionType): BalanceUpdateAction[] {
  switch (txn.type) {
    case 'expense':
      return [{ accountId: txn.account!, delta: -txn.amount }];
    case 'income':
      return [{ accountId: txn.account!, delta: txn.amount }];
    case 'transfer':
      if (!txn.toAccount) {
        throw new Error('toAccount missing for transfer transaction');
      }
      return [
        { accountId: txn.account!, delta: -txn.amount },
        { accountId: txn.toAccount!, delta: txn.amount },
      ];
    default:
      return [];
  }
}

export const updateAccountBalance = async (
  userId: string | mongoose.Types.ObjectId,
  accountId: string | mongoose.Types.ObjectId,
  balanceChange: number
) => {
  return UserModel.updateOne(
    {
      _id: toObjectId(userId),
      'accounts._id': toObjectId(accountId),
    },
    {
      $inc: {
        'accounts.$.balance': balanceChange,
      },
    }
  );
};

export const revertTransactionBalance = async (
  userId: string,
  deletedTransaction: TransactionType
) => {
  const { amount, type, account, toAccount } = deletedTransaction;

  // Early return if no account is specified
  if (!account) return;

  switch (type) {
    case 'income':
      // Revert income: subtract the amount from account balance
      await updateAccountBalance(userId, account, -amount);
      break;

    case 'expense':
      // Revert expense: add the amount back to account balance
      await updateAccountBalance(userId, account, amount);
      break;

    case 'transfer':
      if (!toAccount) return;

      // Revert transfer: add amount back to source, subtract from destination
      await Promise.all([
        updateAccountBalance(userId, account, amount),
        updateAccountBalance(userId, toAccount, -amount),
      ]);
      break;

    default:
      // Handle unknown transaction types gracefully
      console.warn(`Unknown transaction type: ${type}`);
  }
};

/*
    // Keep only changed queries for - amount, account and type

    const filteredQuery: UpdateQuery = filterQuery(doc, updateQuery);

   ----------------
       Update balance

    case 1: only amount change - then change balance of current account
    case 2: only account change - change balance of current account and new account added
    case 3: only type change to transfer - change balance of toAccount
    case 4: only toAccount change - change balance of old and new toAccount
    case 5: amount change + account change
    case 6: amount change + type change
    case 7: amount change + account change + typechange
    case 8: account change + typechange 
    ...
    ----------------

    const shouldUpdateAmount = filteredQuery.amount !== undefined;
    const shouldUpdateAccount = filteredQuery.account !== undefined;
    const shouldUpdateType = filteredQuery.type !== undefined;

    const amount =
      doc.type === 'expense'
        ? doc.amount - filteredQuery.amount!
        : filteredQuery.amount! - doc.amount;

    if (shouldUpdateAmount && !shouldUpdateAccount && !shouldUpdateType) {
      // Case 1: only amount changed
      // Adjust balance for the current account and accountTo if it is of type transfer

      await updateBalance({
        userId,
        account: doc.account,
        toAccount: doc.toAccount,
        amount,
      });
    }

    if (shouldUpdateAccount && !shouldUpdateAmount && !shouldUpdateType) {
      // Case 2: only account changed
      // Deduct from old account, add to new account

      await updateBalance({

      })
    }

    if (shouldUpdateType && !shouldUpdateAmount && !shouldUpdateAccount) {
      // Case 3: only type changed
      // Adjust based on new type
    }

    // Handle combos
    if (shouldUpdateAmount && shouldUpdateAccount && !shouldUpdateType) {
      // Case 4: amount + account changed
    }

    if (shouldUpdateAmount && shouldUpdateAccount && shouldUpdateType) {
      // Case 5
    }

    if (shouldUpdateAccount && shouldUpdateType) {
      // Case 7
    }

    if (shouldUpdateAccount && shouldUpdateType) {
      // Case 7
    }

export const filterQuery = (doc: TransactionType, updateQuery: UpdateQuery) => {
  const filteredQuery: UpdateQuery = {};

  for (const key in updateQuery) {
    const typedKey = key as keyof UpdateQuery;

    // Include fields that are NOT amount, account, or type
    if (
      typedKey !== 'amount' &&
      typedKey !== 'account' &&
      typedKey !== 'type'
    ) {
      (filteredQuery as any)[typedKey] = updateQuery[typedKey];
    } else if (updateQuery[typedKey] !== doc[typedKey]) {
      // Only include amount/account/type if they've actually changed
      (filteredQuery as any)[typedKey] = updateQuery[typedKey];
    }
  }

  return filteredQuery;
};

interface BalanceData {
  userId: string;
  account: string | mongoose.Types.ObjectId;
  toAccount: string | mongoose.Types.ObjectId | undefined | null;
  amount: number;
}

export const updateBalance = async (balanceData: BalanceData) => {
  if (balanceData.toAccount) {
    await UserModel.updateOne(
      { _id: toObjectId(balanceData.userId) },
      {
        $inc: {
          'accounts.$[from].balance': -balanceData.amount,
          'accounts.$[to].balance': balanceData.amount,
        },
      },
      {
        arrayFilters: [
          { 'from._id': toObjectId(balanceData.account) },
          { 'to._id': toObjectId(balanceData.toAccount) },
        ],
      }
    );
    return true;
  }

  await UserModel.updateOne(
    {
      _id: toObjectId(balanceData.userId),
      'accounts._id': toObjectId(balanceData.account),
    },
    { $inc: { 'accounts.$.balance': balanceData.amount } }
  );

  return true;
};
*/
