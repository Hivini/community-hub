export interface CreateUser {
    name: string,
    email: string,
    password: string
}

export interface User {
    uuid: string,
    name: string,
    email: string,
    houseId: number | null
}

export function isCreateUser(arg: any): arg is CreateUser {
    let hasName = arg.name && typeof (arg.name) == 'string';
    let hasEmail = arg.email && typeof (arg.email) == 'string';
    let hasPassword = arg.password && typeof (arg.password) == 'string';
    return arg && hasName && hasEmail && hasPassword;
}