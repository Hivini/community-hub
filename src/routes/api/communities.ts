import type { EndpointOutput } from '@sveltejs/kit';

let dummyCommunities = [
	{
		id: 1,
		name: 'ISC',
		lat: 20.73,
		lon: -103.45,
		currency: 'MXN'
	},
	{
		id: 2,
		name: 'ITC',
		lat: 22.57,
		lon: -105.23,
		currency: 'USD'
	},
	{
		id: 3,
		name: 'ITI',
		lat: 19.37,
		lon: -101.83,
		currency: 'JPN'
	}
];

/**
 * Returns all the communities stored in the DB.
 */

export async function get(): Promise<EndpointOutput> {
	return { body: dummyCommunities };
}
