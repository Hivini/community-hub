export interface CreateRequest {
	content: string;
	creationDate: string;
	houseId: number;
}

export interface Request extends CreateRequest {
	id: number;
}

export function isCreateRequest(arg: any): arg is CreateRequest {
	let hasContent = arg.content && typeof arg.content == 'string';
	let hasCreationDate = arg.creationDate && typeof arg.creationDate == 'string';
	let hasHouseId = arg.houseId && typeof arg.houseId == 'number';
	return arg && hasContent && hasCreationDate && hasHouseId;
}
