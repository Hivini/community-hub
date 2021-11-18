import type { EndpointOutput } from '@sveltejs/kit';
import { getMessages, getSingleMessage, insertMessage } from '$lib/db/message_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateMessage } from '$lib/dto/message';
import { verifyToken } from '$lib/auth_guard';

export async function get({ headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	return { body: await getMessages() };
}

export async function post({ body, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	if (isCreateMessage(body)) {
		let resp = await insertMessage(body);
		let message = await getSingleMessage(resp['insertId']);
		return { status: 201, body: message };
	}
	return DEFAULT_ERROR_REQUEST;
}
