import type { CreateEvent } from "$lib/dto/event";
import { queryWithValues } from "./db_lib";

/**
 * Gets all existing events from a community.
 * 
 * @param communityId The ID of the community.
 * @returns A list of events of a community.
 */
export async function getEvents(communityId: number) {
    const query = "SELECT id, description, DATE_FORMAT(eventDate, '%Y-%m-%d %T') AS eventDate from COMMUNITY_EVENT WHERE communityId=?";
    return queryWithValues(query, [communityId]);
}

/**
 * Gets the information of an event.
 * 
 * @param id The ID of the event. 
 * @returns The event information.
 */
export async function getEvent(id: number) {
    const query = "SELECT id, description, DATE_FORMAT(eventDate, '%Y-%m-%d %T') AS eventDate from COMMUNITY_EVENT WHERE id=?"
    const resp = await queryWithValues(query, [id]);
    return resp[0];
}

/**
 * Inserts a new event in a community.
 * 
 * @param communityId The ID of the community.
 * @param eventInfo The information about the event.
 * @returns The response of the database.
 */
export async function insertEvent(communityId: number, eventInfo: CreateEvent) {
    let query = "INSERT INTO COMMUNITY_EVENT (description, eventDate, communityId) VALUES (?, ?, ?)";
    let values = [eventInfo.description, eventInfo.datetime, communityId];
    return queryWithValues(query, values);
}


/**
 * Updates and existing event in the database.
 * 
 * @param id The ID of the event.
 * @param community The updated information of the event.
 * @returns The response from the database.
 */
export async function updateEvent(id: number, event: CreateEvent) {
    let query = "UPDATE COMMUNITY_EVENT SET description=?,eventDate=? WHERE id = ?";
    let values = [event.description, event.datetime, id];
    return queryWithValues(query, values);
}

/**
 * Deletes an event from the database.
 * 
 * @param id The ID of the event.
 * @returns The data if the operation is successful.
 */
export async function deleteEvent(id: number) {
    let query = "DELETE FROM COMMUNITY_EVENT WHERE id = ?";
    return queryWithValues(query, [id]);
}
