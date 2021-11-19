import type { EndpointOutput } from '@sveltejs/kit';
import { deleteHouse, getSingleHouse, updateHouse } from '$lib/db/house_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { verifyToken } from '$lib/auth_guard';
import { isCreateHouse } from '$lib/dto/house';

export async function get({ params, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id) {
		const house = await getSingleHouse(id);
		if (house) {
			return { body: house };
		}
		return { status: 404, body: `House with id '${id}' has not been found.` };
	}
	return DEFAULT_ERROR_REQUEST;
}

export async function put({ body, headers, params }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id && isCreateHouse(body)) {
		const house = await getSingleHouse(id);
		if (house) {
			const resp = await updateHouse(id, body);
			const newHouse = await getSingleHouse(id);
			if (resp && newHouse) {
				return { status: 200, body: newHouse };
			}
		}
		return {
			status: 404,
			body: `House with id '${id}' cannot be updated since it doesn't exist.`
		};
	}
	return DEFAULT_ERROR_REQUEST;
}

export async function del({ params, headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	const { id } = params;
	if (id) {
		const house = await getSingleHouse(id);
		if (house) {
			const resp = await deleteHouse(id);
			if (resp) {
				return { status: 200, body: `House with id '${id}' has been deleted successfully.` };
			}
		}
		return {
			status: 404,
			body: `House with id '${id}' cannot be deleted since it doesn't exist.`
		};
	}
	return DEFAULT_ERROR_REQUEST;
}
