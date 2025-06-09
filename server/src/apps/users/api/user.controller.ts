import { NextFunction, Request, Response } from 'express';
import { UserService } from '../domain/user.service';
import { HttpStatusCode } from 'types';

const userService = new UserService();

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(req.userId);
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);

    res.cookie('access_token', user.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: 'Insertion successful',
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.loginUser(req.body);

    res.cookie('access_token', user.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

export default { getUser, registerUser, loginUser };
