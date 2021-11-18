import type { CreateRequest } from '$lib/dto/request';
import { simpleQuery, queryWithValues } from './db_lib';

/**
 * Gets all existing requests.
 *
 * @returns A list of all the requests in the database.
 */
export async function getRequests() {
	return simpleQuery('SELECT * from REQUEST');
}

/**
 * Gets the information of a request that corresponds to the id.
 * @param id The id of the request.
 * @returns The information about the request.
 */
export async function getSingleRequest(id: number) {
	const resp = await queryWithValues('SELECT * FROM REQUEST WHERE id = ?', [id]);
	// Give the first result, since it's going to be a list.
	return resp[0];
}

/**
 * Inserts a request to the database.
 *
 * @param request The information about the request.
 * @returns The response of the database.
 */
export async function insertRequest(request: CreateRequest) {
	let query = 'INSERT INTO REQUEST (content, creationDate , houseId) VALUES (?, ?, ?)';
	let values = [request.content, request.creationDate, request.houseId];
	return queryWithValues(query, values);
}

/**
 * Updates and existing request in the database.
 *
 * @param id The ID of the request.
 * @param request The updated information of the request.
 * @returns The response from the database.
 */
export async function updateRequest(id: number, request: CreateRequest) {
	let query = 'UPDATE REQUEST SET content=?, creationDate=?, houseId=? WHERE id = ?';
	let values = [request.content, request.creationDate, request.houseId, id];
	return queryWithValues(query, values);
}

/**
 * Deletes a request from the database.
 *
 * @param id The ID of the request.
 * @returns The data if the operation is successful.
 */
export async function deleteRequest(id: number) {
	let query = 'DELETE FROM REQUEST WHERE id = ?';
	return queryWithValues(query, [id]);
}
