import { verifyToken } from "$lib/auth_guard";
import { deleteCommunity, getSingleCommunity, updateCommunity } from "$lib/db/community_lib";
import { isCreateCommunity } from "$lib/dto/community";
import { DEFAULT_ERROR_REQUEST } from "$lib/errors";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params, headers }): Promise<EndpointOutput> {
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id } = params;
    if (id) {
        const community = await getSingleCommunity(id);
        if (community) {
            return { body: community };
        }
        return { status: 404, body: `Community with id '${id}' has not been found.` };
    }
    return DEFAULT_ERROR_REQUEST;
};

export async function put({ params, body, headers }): Promise<EndpointOutput> {
    // TODO(hivini): Verify only admins can do this.
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id } = params;
    if (id && isCreateCommunity(body)) {
        const community = await getSingleCommunity(id);
        if (community) {
            const resp = await updateCommunity(id, body);
            const newCommunity = await getSingleCommunity(id);
            if (resp && newCommunity) {
                return { status: 200, body: newCommunity };
            }
        }
        return { status: 404, body: `Community with id '${id}' cannot be updated since it doesn't exist.` };
    }
    return DEFAULT_ERROR_REQUEST;
}

export async function del({ params, headers }): Promise<EndpointOutput> {
    // TODO(hivini): Verify only admins can do this.
    const error = verifyToken(headers);
    if (error != null) {
        return error;
    }
    const { id } = params;
    if (id) {
        const community = await getSingleCommunity(id);
        if (community) {
            const resp = await deleteCommunity(id);
            if (resp) {
                return { status: 200, body: `Community with id '${id}' has been deleted successfully.` };
            }
        }
        return { status: 404, body: `Community with id '${id}' cannot be deleted since it doesn't exist.` };
    }
    return DEFAULT_ERROR_REQUEST;
}