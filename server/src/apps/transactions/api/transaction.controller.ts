import { NextFunction, Request, Response } from 'express';
import { TransactionService } from '../domain/transaction.service';
import { HttpStatusCode } from 'types';
import { getTransactionsQuerySchema } from '../validations/transaction.schema';

const transactionService = new TransactionService();

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = getTransactionsQuerySchema.parse(req.query);

    const data = await transactionService.getTransactions(req.userId!, query);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Transactions fetched successfully',
      data: data.transactions,
      pagination: {
        skip: query.skip ?? 0,
        limit: query.limit ?? 20,
        count: data.transactions.length,
        totalCount: data.totalCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.userId = req.userId;
    req.body.date = new Date(req.body.date);
    
    const transactionId = await transactionService.addTransaction(req.body);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Transaction added successfully',
      transactionId,
    });
  } catch (err) {
    next(err);
  }
};

const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};

const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};

export {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
