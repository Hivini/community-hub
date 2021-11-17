export interface CreateHouse {
	name: string;
	communityId: number;
}

export interface House extends CreateHouse {
	id: number;
}

export function isCreateHouse(arg: any): arg is CreateHouse {
	let hasName = arg.name && typeof arg.name == 'string';
	let hasCommunityId = arg.communityId && typeof arg.communityId == 'number';
	return arg && hasName && hasCommunityId;
}
