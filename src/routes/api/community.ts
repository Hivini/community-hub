import type { EndpointOutput } from '@sveltejs/kit';
import { getCommunities, getSingleCommunity, insertCommunity } from '$lib/db/community_lib'
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateCommunity } from '$lib/dto/create_community';

export async function get(): Promise<EndpointOutput> {
	return { body: await getCommunities() };
}

export async function post({ body }): Promise<EndpointOutput> {
	if (isCreateCommunity(body)) {
		let resp = await insertCommunity(body);
		let community = await getSingleCommunity(resp["insertId"]);
		return { status: 200, body: community };
	}
	return DEFAULT_ERROR_REQUEST;
}


