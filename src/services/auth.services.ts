import jwt, { Secret } from "jsonwebtoken";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../config/data.config";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_MESSAGE_STATUS,
  SUCCESS_MESSAGES_STATUS,
} from "../constants/constants";

const SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

function generateAccessToken(user: any) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "10m" });
}

export const signupServices = async (
  errors: any,
  username: string,
  password: string,
  role: string
): Promise<any> => {
  if (!errors.isEmpty()) {
    return {
      message: ERROR_MESSAGES.IMPROPER_DATA,
      code: ERROR_MESSAGE_STATUS.BAD_REQUEST,
    };
  }

  const userRepository = AppDataSource.getRepository(User);

  try {
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return {
        message: ERROR_MESSAGES.USER_EXISTS,
        code: ERROR_MESSAGE_STATUS.BAD_REQUEST,
      };
    }

    const newUser = userRepository.create({ username, password, role });
    await userRepository.save(newUser);

    return {
      message: SUCCESS_MESSAGES.CREATED,
      code: SUCCESS_MESSAGES_STATUS.CREATED,
      user: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      message: ERROR_MESSAGES.NOT_ADDED,
      code: ERROR_MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
};

export const loginServices = async (
  username: string,
  password: string
): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: { username, password },
    });
    if (!user) {
      return {
        message: ERROR_MESSAGES.INVALID_DATA,
        code: ERROR_MESSAGE_STATUS.UNAUTHORIZED_ACCESS,
      };
    }

    const accessToken = generateAccessToken({
      username: user.username,
      role: user.role,
    });
    return { token: accessToken, code: SUCCESS_MESSAGES_STATUS.SUCCESS };
  } catch (error) {
    console.error(error);
    return {
      message: ERROR_MESSAGES.TOKEN_ERROR,
      code: ERROR_MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
};
