import type { EndpointOutput } from '@sveltejs/kit';
import { getSingleCommunity } from '$lib/db/community_lib'
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { verifyToken } from '$lib/auth_guard';
import { getEvent, getEvents, insertEvent } from '$lib/db/event_lib';
import { isCreateEvent } from '$lib/dto/event';

export async function get({ headers, params }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id } = params;
    const community = await getSingleCommunity(id);
    if (community) {
        return { body: await getEvents(id) };
    }
    return DEFAULT_ERROR_REQUEST;
}

export async function post({ body, headers, params }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id } = params;
    const community = await getSingleCommunity(id);
    if (!community) {
        return { status: 404, body: `Community with id '${id}' does not exist.` };
    }
    if (isCreateEvent(body)) {
        let resp = await insertEvent(id, body);
        let event = await getEvent(resp['insertId']);
        return { status: 201, body: event };
    }
    return DEFAULT_ERROR_REQUEST;
}


