export interface CreateMessage {
	description: string;
	sentTime: string;
	communityId: number;
	userId: string;
}

export interface Message extends CreateMessage {
	id: number;
}

export function isCreateMessage(arg: any): arg is CreateMessage {
	let hasDescription = arg.description && typeof arg.description == 'string';
	let hasSentTime = arg.sentTime && typeof arg.sentTime == 'string';
	let hasCommunityId = arg.communityId && typeof arg.communityId == 'number';
	let hasUserId = arg.userId && typeof arg.userId == 'string';
	return arg && hasDescription && hasSentTime && hasCommunityId && hasUserId;
}
