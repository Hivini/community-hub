import type { CreateHouse } from '$lib/dto/house';
import { simpleQuery, queryWithValues } from './db_lib';

/**
 * Gets all existing houses.
 *
 * @returns A list of all the houses in the database.
 */
export async function getHouses() {
	return simpleQuery('SELECT * from HOUSE');
}

/**
 * Gets the information of a house that corresponds to the id.
 * @param id The id of the house.
 * @returns The information about the house.
 */
export async function getSingleHouse(id: number) {
	const resp = await queryWithValues('SELECT * FROM HOUSE WHERE id = ?', [id]);
	// Give the first result, since it's going to be a list.
	return resp[0];
}

/**
 * Inserts a house to the database.
 *
 * @param house The information about the house.
 * @returns The response of the database.
 */
export async function insertHouse(house: CreateHouse) {
	let query = 'INSERT INTO HOUSE (name, communityId) VALUES (?, ?)';
	let values = [house.name, house.communityId];
	return queryWithValues(query, values);
}

/**
 * Updates and existing house in the database.
 *
 * @param id The ID of the house.
 * @param house The updated information of the house.
 * @returns The response from the database.
 */
export async function updateHouse(id: number, house: CreateHouse) {
	let query = 'UPDATE HOUSE SET name=?, communityId=? WHERE id = ?';
	let values = [house.name, house.communityId, id];
	return queryWithValues(query, values);
}

/**
 * Deletes a house from the database.
 *
 * @param id The ID of the house.
 * @returns The data if the operation is successful.
 */
export async function deleteHouse(id: number) {
	let query = 'DELETE FROM HOUSE WHERE id = ?';
	return queryWithValues(query, [id]);
}
