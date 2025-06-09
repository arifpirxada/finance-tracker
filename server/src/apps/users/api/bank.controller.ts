import { NextFunction, Request, Response } from 'express';
import { BankService } from '../domain/bank.service';
import { HttpStatusCode } from 'types';

const bankService = new BankService();

const addBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountId = await bankService.addAccount(req.userId, req.body);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Bank account added successfully',
      accountId,
    });
  } catch (err) {
    next(err);
  }
};

const updateBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bankService.updateAccount(req.userId, req.params.id, req.body);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Bank account updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

const deleteBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bankService.deleteAccount(req.userId, req.params.id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Bank account deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export { addBankAccount, updateBankAccount, deleteBankAccount };
