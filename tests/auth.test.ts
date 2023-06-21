import request from "supertest";
import app from "../app";
import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from "../config/default";
import { sequelize } from "../utils/PgDatabase";

const signUpPayload = {
	email: "johndoe@gmail.com",
	password: "qwerty",
	provider: "LOCAL",
};

const InvalidSignUpPayload = {
	password: "qwerty",
	provider: "LOCAL",
};

const successfulSignUp = async () => {
	const resp = await request(app)
		.post("/api/v1/auth/signup")
		.send(signUpPayload);

	expect(resp.status).toEqual(200);
	expect(resp.body.success).toEqual(true);
	expect(resp.body.data.email).toEqual(signUpPayload.email);
};

const successfulSignUpAndLogin = async () => {
	await successfulSignUp();
	// Log In
	const resp = await request(app)
		.post("/api/v1/auth/login")
		.send(signUpPayload);

	expect(resp.status).toEqual(200);
	expect(resp.body.success).toEqual(true);
	expect(resp.body.data.email).toEqual(signUpPayload.email);

	return {
		authToken: resp.body.authToken,
		refreshToken: resp.body.refreshToken,
	};
};

describe("Tests the fetch, create and delete image functions", () => {
	beforeEach(async () => {
		await sequelize.authenticate();
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {});

	it("Sign Up Happy Flow", async () => {
		await successfulSignUp();
	});

	it("Sign Up Invalid Request", async () => {
		const resp = await request(app)
			.post("/api/v1/auth/signup")
			.send(InvalidSignUpPayload);

		expect(resp.status).toEqual(400);
		expect(resp.body.success).toEqual(false);
	});

	it("Log In Happy Flow", async () => {
		// Sign Up
		await successfulSignUp();
		// Log In
		const resp = await request(app)
			.post("/api/v1/auth/login")
			.send(signUpPayload);

		expect(resp.status).toEqual(200);
		expect(resp.body.success).toEqual(true);
		expect(resp.body.data.email).toEqual(signUpPayload.email);
	});

	it("Log In Invalid Request", async () => {
		// Sign Up
		await successfulSignUp();
		// Log In
		const resp = await request(app)
			.post("/api/v1/auth/login")
			.send(InvalidSignUpPayload);

		expect(resp.status).toEqual(400);
		expect(resp.body.success).toEqual(false);
	});

	it("User Details Happy Flow", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Get User Details
		const resp = await request(app)
			.get("/api/v1/user/profile")
			.set("Authorization", "Bearer " + tokens.authToken);

		expect(resp.status).toEqual(200);
		expect(resp.body.success).toEqual(true);
		expect(resp.body.data.email).toEqual(signUpPayload.email);
	});

	it("User Details Fails Authentication", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Get User Details with token
		const resp = await request(app).get("/api/v1/user/profile");

		expect(resp.status).toEqual(401);
		expect(resp.body.success).toEqual(false);
	});

	it("Update User Details Happy Flow", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Update User Details
		const resp = await request(app)
			.put("/api/v1/user/editProfile")
			.set("Authorization", "Bearer " + tokens.authToken)
			.send({
				name: "White Fish 2",
				bio: "RAM of volleyball",
				image: "******",
				phoneNumber: 232232332,
			});

		expect(resp.status).toEqual(200);
		expect(resp.body.success).toEqual(true);
		expect(resp.body.data.name).toEqual("White Fish 2");
	});

	it("Update User Details Fails Authentication", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Update User Details without token
		const resp = await request(app).put("/api/v1/user/editProfile").send({
			name: "White Fish 2",
			bio: "RAM of volleyball",
			image: "******",
			phoneNumber: 232232332,
		});

		expect(resp.status).toEqual(401);
		expect(resp.body.success).toEqual(false);
	});

    it("Refresh Token Happy Flow", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Get new JWT
		const resp = await request(app)
			.post("/api/v1/auth/refreshToken")
			.send({
				"refreshToken": tokens.refreshToken
			});

		expect(resp.status).toEqual(200);
		expect(resp.body.success).toEqual(true);
	});

	it("Refresh Token Fails", async () => {
		const tokens = await successfulSignUpAndLogin();
		// Get new JWT
		const resp = await request(app)
			.post("/api/v1/auth/refreshToken")
			.send({
				"refreshToken": "jddjdjdjdj"
			});

		expect(resp.status).toEqual(400);
		expect(resp.body.success).toEqual(false);
	});
});
