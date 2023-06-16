export interface updatePayload {
	name?: string,
	image?: string,
	phoneNumber?: string,
	bio?: string
}

export interface createPayload extends updatePayload {
    email: string,
	password: string,
	provider: string,
}