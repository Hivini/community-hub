import type { CreateMessage } from '$lib/dto/message';
import { simpleQuery, queryWithValues } from './db_lib';

/**
 * Gets all existing messages.
 *
 * @returns A list of all the messages in the database.
 */
export async function getMessages() {
	return simpleQuery('SELECT * from MESSAGE');
}

/**
 * Gets the information of a message that corresponds to the id.
 * @param id The id of the message.
 * @returns The information about the message.
 */
export async function getSingleMessage(id: number) {
	const resp = await queryWithValues('SELECT * FROM MESSAGE WHERE id = ?', [id]);
	// Give the first result, since it's going to be a list.
	return resp[0];
}

/**
 * Inserts a message to the database.
 *
 * @param message The information about the message.
 * @returns The response of the database.
 */
export async function insertMessage(message: CreateMessage) {
	let query = 'INSERT INTO MESSAGE (description, sentTime,communityId, userId) VALUES (?, ?, ?, ?)';
	let values = [message.description, message.sentTime, message.communityId, message.userId];
	return queryWithValues(query, values);
}

/**
 * Updates and existing message in the database.
 *
 * @param id The ID of the message.
 * @param message The updated information of the message.
 * @returns The response from the database.
 */
export async function updateMessage(id: number, message: CreateMessage) {
	let query = 'UPDATE MESSAGE SET description=?, sentTime=?, communityId=?, userId=? WHERE id = ?';
	let values = [message.description, message.sentTime, message.communityId, message.userId, id];
	return queryWithValues(query, values);
}

/**
 * Deletes a message from the database.
 *
 * @param id The ID of the message.
 * @returns The data if the operation is successful.
 */
export async function deleteMessage(id: number) {
	let query = 'DELETE FROM MESSAGE WHERE id = ?';
	return queryWithValues(query, [id]);
}
