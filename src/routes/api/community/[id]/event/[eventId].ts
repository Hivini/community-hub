import { verifyToken } from "$lib/auth_guard";
import { getSingleCommunity } from "$lib/db/community_lib";
import { deleteEvent, getEvent, updateEvent } from "$lib/db/event_lib";
import { isCreateEvent } from "$lib/dto/event";
import { DEFAULT_ERROR_REQUEST } from "$lib/errors";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params, headers }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id, eventId } = params;
    if (id && eventId) {
        const community = await getSingleCommunity(id);
        const event = await getEvent(eventId);
        if (community && event) {
            return { body: event };
        }
        return { status: 404, body: `Community or event not found.` };
    }
    return DEFAULT_ERROR_REQUEST;
};

export async function put({ params, body, headers }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id, eventId } = params;
    if (id && eventId && isCreateEvent(body)) {
        const community = await getSingleCommunity(id);
        const event = await getEvent(eventId);
        if (community && event) {
            const resp = await updateEvent(eventId, body);
            const newEvent = await getEvent(eventId);
            if (resp && newEvent) {
                return { status: 200, body: newEvent };
            }
        }
        return { status: 404, body: `Community or event cannot be updated since it has not been found.` };
    }
    return DEFAULT_ERROR_REQUEST;
}

export async function del({ params, headers }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id, eventId } = params;
    if (id && eventId) {
        const community = await getSingleCommunity(id);
        const event = await getEvent(eventId);
        if (community && event) {
            const resp = await deleteEvent(eventId);
            if (resp) {
                return { status: 200, body: `Event with id '${eventId}' has been deleted successfully.` };
            }
        }
        return { status: 404, body: `Community or event cannot be deleted since it has not been found.` };
    }
    return DEFAULT_ERROR_REQUEST;
}