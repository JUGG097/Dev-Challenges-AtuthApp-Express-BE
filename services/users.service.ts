import { User } from "../models/users.model";
import { createPayload, updatePayload } from "../utils/Types";

export const createUser = async (payload: createPayload) => {
	const newUser = await User.create({
		...payload,
	});
	return newUser.toJSON();
};

export const getUserById = async (id: number) => {
	const userDetails = await User.findByPk(id);
	if (!userDetails) {
		return null;
	}
	return userDetails.toJSON();
};

export const getUserByEmail = async (email: string) => {
	const userDetails = await User.findOne({where: {
        email: email
    }});
	if (!userDetails) {
		return null;
	}
	return userDetails.toJSON();
};

export const updateUser = async (id: number, payload: updatePayload) => {
	const updatedUser = await User.update(
		{ ...payload },
		{
			where: {
				id: id,
			},
		}
	);
};
