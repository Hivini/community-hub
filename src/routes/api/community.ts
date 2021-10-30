import type { EndpointOutput } from '@sveltejs/kit';
import { getCommunities, getSingleCommunity, insertCommunity } from '$lib/db/community_lib'
import { DEFAULT_ERROR_REQUEST } from '$lib/errors';
import { isCreateCommunity } from '$lib/dto/community';
import { verifyToken } from '$lib/auth_guard';

export async function get({ headers }): Promise<EndpointOutput> {
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	return { body: await getCommunities() };
}

export async function post({ body, headers }): Promise<EndpointOutput> {
	// TODO(hivini): Verify only admins can do this.
	const error = verifyToken(headers);
	if (error != null) {
		return error;
	}
	if (isCreateCommunity(body)) {
		let resp = await insertCommunity(body);
		let community = await getSingleCommunity(resp["insertId"]);
		return { status: 201, body: community };
	}
	return DEFAULT_ERROR_REQUEST;
}


