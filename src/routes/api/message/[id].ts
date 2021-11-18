import type { EndpointOutput } from '@sveltejs/kit';
import { deleteMessage, getSingleMessage, updateMessage } from '$lib/db/message_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateMessage } from '$lib/dto/message';
import { verifyToken } from '$lib/auth_guard';

export async function get({ params, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id) {
		const message = await getSingleMessage(id);
		if (message) {
			return { body: message };
		}
		return { status: 404, body: `Message with id '${id}' has not been found.` };
	}
	return DEFAULT_ERROR_REQUEST;
}

export async function put({ body, headers, params }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id && isCreateMessage(body)) {
		const message = await getSingleMessage(id);
		if (message) {
			const resp = await updateMessage(id, body);
			const newMessage = await getSingleMessage(id);
			if (resp && newMessage) {
				return { status: 200, body: newMessage };
			}
		}
		return {
			status: 404,
			body: `Message with id '${id}' cannot be updated since it doesn't exist.`
		};
	}
	return DEFAULT_ERROR_REQUEST;
}

export async function del({ params, headers }): Promise<EndpointOutput> {
	// TODO(hivini): Verify only admins can do this.
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id) {
		const message = await getSingleMessage(id);
		if (message) {
			const resp = await deleteMessage(id);
			if (resp) {
				return { status: 200, body: `Message with id '${id}' has been deleted successfully.` };
			}
		}
		return {
			status: 404,
			body: `Message with id '${id}' cannot be deleted since it doesn't exist.`
		};
	}
	return DEFAULT_ERROR_REQUEST;
}
