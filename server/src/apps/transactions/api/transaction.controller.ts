import { NextFunction, Request, Response } from 'express';
import { TransactionService } from '../domain/transaction.service';
import { HttpStatusCode } from 'types';
import { getTransactionsQuerySchema } from '../validations/transaction.schema';
import BaseError from '@libraries/errors/BaseError';
import mongoose from 'mongoose';

const transactionService = new TransactionService();

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = getTransactionsQuerySchema.parse(req.query);

    if (!req.userId) {
      throw new BaseError('No user Id', HttpStatusCode.BAD_REQUEST, 'Could not get user Id')
    }

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
      message: 'Transaction added',
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
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    const updatedDoc = await transactionService.updateTransaction(
      req.userId!,
      req.body
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Transaction updated',
      data: updatedDoc,
    });
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
    const { id: transactionId } = req.params;
    if (!transactionId || !mongoose.Types.ObjectId.isValid(transactionId)) {
      throw new BaseError(
        'Invalid ID',
        HttpStatusCode.BAD_REQUEST,
        'Invalid or missing transaction ID'
      );
    }

    await transactionService.deleteTransaction(req.userId!, transactionId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Transaction deleted',
    });
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
