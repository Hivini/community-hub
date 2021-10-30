import { findUser, registerUser } from "$lib/db/user_lib";
import { isCreateUser } from "$lib/dto/user";
import { DEFAULT_ERROR_REQUEST } from "$lib/errors";
import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ body }): Promise<EndpointOutput> {
    if (isCreateUser(body)) {
        let user = await findUser(body.email);
        if (!user) {
            await registerUser(body);
            return { status: 200, body: 'User sucessfully registered.' };
        }
        return { status: 400, body: 'User already exists.' };
    }
    return DEFAULT_ERROR_REQUEST;
}