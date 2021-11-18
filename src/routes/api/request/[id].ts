import type { EndpointOutput } from '@sveltejs/kit';
import { deleteRequest, getSingleRequest, updateRequest } from '$lib/db/request_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateRequest } from '$lib/dto/request';
import { verifyToken } from '$lib/auth_guard';

export async function get({ params, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id) {
		const request = await getSingleRequest(id);
		if (request) {
			return { body: request };
		}
		return { status: 404, body: `Request with id '${id}' has not been found.` };
	}
	return DEFAULT_ERROR_REQUEST;
}

export async function put({ body, headers, params }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id && isCreateRequest(body)) {
		const request = await getSingleRequest(id);
		if (request) {
			const resp = await updateRequest(id, body);
			const newRequest = await getSingleRequest(id);
			if (resp && newRequest) {
				return { status: 200, body: newRequest };
			}
		}
		return {
			status: 404,
			body: `Request with id '${id}' cannot be updated since it doesn't exist.`
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
		const request = await getSingleRequest(id);
		if (request) {
			const resp = await deleteRequest(id);
			if (resp) {
				return { status: 200, body: `Request with id '${id}' has been deleted successfully.` };
			}
		}
		return {
			status: 404,
			body: `Request with id '${id}' cannot be deleted since it doesn't exist.`
		};
	}
	return DEFAULT_ERROR_REQUEST;
}
