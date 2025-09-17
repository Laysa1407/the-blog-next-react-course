"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

type JwtPayload = {
    userName: string;
    expireAt: Date;
};

const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXP_SECONDS || 86400);
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);

    const base64 = Buffer.from(hash).toString("base64");

    return base64;
}

export async function verifyPassword(password: string, hashBase64: string) {
    const hash = Buffer.from(hashBase64, "base64").toString("utf-8");

    return await bcrypt.compare(password, hash);
}

export async function createLoginSession(userName: string) {
    const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
    const loginSession = await signJWT({ userName, expireAt: expiresAt });

    const cookieStore = await cookies();
    cookieStore.set(loginCookieName, loginSession, {
        expires: expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
}

export async function deleteLoginSession() {
    const cookiesStore = await cookies();
    cookiesStore.set(loginCookieName, "", { expires: new Date(0) });
    cookiesStore.delete(loginCookieName);
}

export async function signJWT(jwt: JwtPayload) {
    return new SignJWT(jwt)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(loginExpStr)
        .sign(jwtEncodeKey);
}

export async function getLoginSession() {
    const cookiesStore = await cookies();
    const jwt = cookiesStore.get(loginCookieName)?.value;

    if (!jwt) return false;

    return await verifyJWT(jwt);
}

export async function verifyLoginSession() {
    const JwtPayload = await getLoginSession();

    if (!JwtPayload) return false;

    return JwtPayload?.userName === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
    const isAuthenticated = await verifyLoginSession();

    if (!isAuthenticated) {
        redirect("/admin/login");
    }
}

export async function verifyJWT(jwt: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(jwt, jwtEncodeKey, {
            algorithms: ["HS256"],
        });

        return payload as JwtPayload;
    } catch {
        console.log("invalid token!");
        return false;
    }
}
