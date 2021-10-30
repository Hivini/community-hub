export interface CreateCommunity {
    name: string,
    lat: number,
    lon: number,
    currency: string,
    city: string
}

export interface Community extends CreateCommunity {
    id: number
}

export function isCreateCommunity(arg: any): arg is CreateCommunity {
    let hasName = arg.name && typeof (arg.name) == 'string';
    let hasLat = arg.lat && typeof (arg.lat) == 'number';
    let hasLon = arg.lon && typeof (arg.lon) == 'number';
    let hasCurrency = arg.currency && typeof (arg.currency) == 'string';
    let hasCity = arg.city && typeof (arg.city) == 'string';
    return arg && hasName && hasLat && hasLon && hasCurrency && hasCity;
}
