import type { EndpointOutput } from '@sveltejs/kit';
import { getRequests, getSingleRequest, insertRequest } from '$lib/db/request_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateRequest } from '$lib/dto/request';
import { verifyToken } from '$lib/auth_guard';

export async function get({ headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	return { body: await getRequests() };
}

export async function post({ body, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	if (isCreateRequest(body)) {
		let resp = await insertRequest(body);
		let request = await getSingleRequest(resp['insertId']);
		return { status: 201, body: request };
	}
	return DEFAULT_ERROR_REQUEST;
}
