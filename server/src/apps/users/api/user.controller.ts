import { NextFunction, Request, Response } from 'express';
import { UserService } from '../domain/user.service';
import { HttpStatusCode } from 'types';

const userService = new UserService();

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
      user: {
        name: user.name,
        email: user.email,
        accounts: user.accounts,
        tags: user.tags,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = () => {};

export default { registerUser, loginUser };
