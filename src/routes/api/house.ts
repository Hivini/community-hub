import type { EndpointOutput } from '@sveltejs/kit';
import { getHouses, getSingleHouse, insertHouse } from '$lib/db/house_lib';
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateHouse } from '$lib/dto/house';
import { verifyToken } from '$lib/auth_guard';

export async function get({ headers }): Promise<EndpointOutput> {
	return { body: await getHouses() };
}

export async function post({ body, headers }): Promise<EndpointOutput> {
	if (isCreateHouse(body)) {
		let resp = await insertHouse(body);
		let house = await getSingleHouse(resp['insertId']);
		return { status: 201, body: house };
	}
	return DEFAULT_ERROR_REQUEST;
}
