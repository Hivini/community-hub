export interface CreateEvent {
    description: string,
    datetime: string
}

export interface Event extends CreateEvent {
    id: number
}

export function isCreateEvent(arg: any): arg is CreateEvent {
    let hasDescription = arg.description && typeof (arg.description) == 'string';
    let hasDatetime = arg.datetime && typeof (arg.datetime) == 'string';
    return arg && hasDescription && hasDatetime;
}
