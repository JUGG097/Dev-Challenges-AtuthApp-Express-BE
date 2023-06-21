import { RefreshToken } from "../models/refreshToken.model";
import { refreshTokenPayload } from "../utils/Types";

export const createRefreshToken = async (payload: refreshTokenPayload) => {
	const newToken = await RefreshToken.create({
		...payload,
	});

	return newToken.toJSON();
};

export const getRefreshTokenByToken = async (token: string) => {
	const tokenObj = await RefreshToken.findOne({
		where: {
			token: token,
		},
	});
	if (!tokenObj) {
		return null;
	}
	return tokenObj.toJSON();
};
