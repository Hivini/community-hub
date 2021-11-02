export interface LoginInfo {
    email: string,
    password: string
}

export function isLoginInfo(arg: any): arg is LoginInfo {
    let hasEmail = arg.email && typeof (arg.email) == 'string';
    let hasPassword = arg.password && typeof (arg.password) == 'string';
    return arg && hasEmail && hasPassword;
}