import { expressjwt, GetVerificationKey } from "express-jwt";
import { Request } from "express";
import jwksClient from "jwks-rsa";
import { AuthCookie } from "../../types";
import config from "config";

// Setup JWKS client for dynamic public key retrieval
const jwks = jwksClient.expressJwtSecret({
    jwksUri: config.get("server.public_key"),
    cache: true,
    rateLimit: true,
}) as GetVerificationKey;

// Custom token extractor: header or cookie
function extractToken(req: Request): string | undefined {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        if (token && token !== "undefined") return token;
    }

    const { accessToken } = req.cookies as AuthCookie;
    return accessToken;
}

// JWT middleware export
export default expressjwt({
    secret: jwks,
    algorithms: ["RS256"],
    getToken: extractToken,
});
