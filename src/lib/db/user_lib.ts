import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { CreateUser, User } from '$lib/dto/user';
import { queryWithValues } from './db_lib';

/**
 * Generate a JWT token based on the user information.
 *
 * @param user The user information.
 * @returns The JWT token generated.
 */
export async function login(user: User) {
	// TODO(hivini): Save the token on the DB.
	return jwt.sign({ id: user.uuid, email: user.email }, process.env['JWT_SECRET'], {
		expiresIn: '4h'
	});
}

/**
 * Saves the user on the database with the password hash'd.
 * @param user The user information.
 * @returns The result of the operation.
 */
export async function registerUser(user: CreateUser) {
	const encryptedPassword = await bcrypt.hash(user.password, 10);
	let query = 'INSERT INTO USER (name, email, password, houseId) VALUES (?, ?, ?, ?)';
	let values = [user.name, user.email, encryptedPassword, user.houseId];
	return queryWithValues(query, values);
}

/**
 * Finds a user based on it's email.
 * @param email The email of the user.
 * @returns The user that was found.
 */
export async function findUser(email: string) {
	let query = 'SELECT * FROM USER WHERE email = ?';
	let resp = await queryWithValues(query, [email]);
	// Give the first result, since it's going to be a list.
	return resp[0];
}
