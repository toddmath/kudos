import bcrypt from "bcryptjs";

import type { RegisterForm } from "./types.server";
import { prisma } from "./prisma.server";

export const createUser = async ({
	password,
	email,
	firstName,
	lastName,
}: RegisterForm) => {
	const passwordHash = await bcrypt.hash(password, 10);
	const { id } = await prisma.user.create({
		data: {
			email,
			password: passwordHash,
			profile: {
				firstName,
				lastName,
			},
		},
	});

	return { id, email };
};

export const getOtherUsers = async (userId: string) => {
	return prisma.user.findMany({
		where: {
			id: { not: userId },
		},
		orderBy: {
			profile: {
				firstName: "asc",
			},
		},
	});
};

export const getUserById = async (id: string) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};