import { User } from "../entities/users.entity";
import { AppDataSource } from "../app";
import { SUCCESS_MESSAGES,ERROR_MESSAGES,SUCCESS_MESSAGES_STATUS,ERROR_MESSAGE_STATUS } from "../constants/constants";


export const getServices = async (): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return { users };
}

export const readServices = async (id: number): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{id}});
    if (!user) {
        return { message: ERROR_MESSAGES.USER_NOT_FOUND, code: ERROR_MESSAGE_STATUS.NOT_FOUND };
    }
    return { user };
}

export const updateServices = async (body: any, id: number): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);
    const updatedUser = await userRepository.findOne({where:{id}});
    if (!updatedUser) {
        return { message: ERROR_MESSAGES.USER_NOT_FOUND, code: ERROR_MESSAGE_STATUS.NOT_FOUND };
    }
    userRepository.merge(updatedUser, body);
    try {
        await userRepository.save(updatedUser);
        return { message: SUCCESS_MESSAGES.UPDATED, updatedUser, code: SUCCESS_MESSAGES_STATUS.SUCCESS };
    } catch (error) {
        console.error(error);
        return { message: ERROR_MESSAGES.NOT_UPDATED, code: ERROR_MESSAGE_STATUS.INTERNAL_SERVER_ERROR };
    }
}

export const deleteServices = async (id: number): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);
    const deletedUser = await userRepository.findOne({where:{id}});
    if (!deletedUser) {
        return { message: ERROR_MESSAGES.USER_NOT_FOUND, code: ERROR_MESSAGE_STATUS.NOT_FOUND };
    }
    try {
        await userRepository.remove(deletedUser);
        return { message: SUCCESS_MESSAGES.DELETED, deletedUser, code: SUCCESS_MESSAGES_STATUS.SUCCESS};
    } catch (error) {
        console.error(error);
        return { message: ERROR_MESSAGES.NOT_DELETED, code: ERROR_MESSAGE_STATUS.INTERNAL_SERVER_ERROR };
    }
}