import type { CreateCommunity } from "$lib/dto/community";
import { query, queryWithValues } from "./db_lib";

/**
 * Gets all existing communities.
 * 
 * @returns A list of all the communities in the database.
 */
export async function getCommunities() {
    return query("SELECT * from community");
}

/**
 * Gets the information of a community that corresponds to the id.
 * @param id The id of the community.
 * @returns The information about the community.
 */
export async function getSingleCommunity(id: number) {
    const resp = await queryWithValues("SELECT * FROM COMMUNITY WHERE id = ?", [id]);
    // Give the first result, since it's going to be a list.
    return resp[0];
}

/**
 * Inserts a community to the database.
 * 
 * @param community The information about the community. 
 * @returns The response of the database.
 */
export async function insertCommunity(community: CreateCommunity) {
    let query = "INSERT INTO COMMUNITY (name, lat, lon, currency, city) VALUES (?, ?, ?, ?, ?)";
    let values = [community.name, community.lat, community.lon, community.currency, community.city];
    return queryWithValues(query, values);
}

/**
 * Updates and existing community in the database.
 * 
 * @param id The ID of the community.
 * @param community The updated information of the community.
 * @returns The response from the database.
 */
export async function updateCommunity(id: number, community: CreateCommunity) {
    let query = "UPDATE COMMUNITY SET name=?,lat=?,lon=?,currency=?,city=? WHERE id = ?";
    let values = [community.name, community.lat, community.lon, community.currency, community.city, id];
    return queryWithValues(query, values);
}

/**
 * Deletes a community from the database.
 * 
 * @param id The ID of the community. 
 * @returns The data if the operation is successful.
 */
export async function deleteCommunity(id: number) {
    let query = "DELETE FROM COMMUNITY WHERE id = ?";
    return queryWithValues(query, [id]);
}
