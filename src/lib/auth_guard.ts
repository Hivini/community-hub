import jwt from 'jsonwebtoken';

/**
 * Verifies that a JWT is present on the Authorization header.
 * 
 * @param headers The headers of the request.
 * @returns If there is an error, it returns an object to return with the status and body, else, null.
 */
export function verifyToken(headers: any) {
    const header = headers["authorization"];
    if (!header) {
        return { status: 403, body: "A token is required for authentication." }
    }
    const headerParts = header.split(" ");
    if (headerParts.length != 2 && headerParts[0] != "Bearer") {
        return { status: 400, body: "Invalid request." };
    }
    const token = headerParts[1];
    try {
        jwt.verify(token, process.env['JWT_SECRET']);
    } catch (err) {
        return { status: 401, body: "Invalid token." };
    }
    return null;
}
