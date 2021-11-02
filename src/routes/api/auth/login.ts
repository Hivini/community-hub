import bcrypt from 'bcryptjs';
import { findUser, login } from "$lib/db/user_lib";
import { isLoginInfo } from "$lib/dto/login";
import { DEFAULT_ERROR_REQUEST } from "$lib/errors";
import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ body }): Promise<EndpointOutput> {
    if (isLoginInfo(body)) {
        let user = await findUser(body.email);
        if (user) {
            const validPass = await bcrypt.compare(body.password, user.password);
            if (validPass) {
                const token = await login(user);
                return { status: 200, body: { token: token } };
            }
            return { status: 401, body: 'Invalid user email or password.' };
        }
        return { status: 400, body: 'User does not exists.' };
    }
    return DEFAULT_ERROR_REQUEST;
}