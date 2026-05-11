import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-12345');

export interface UserPayload {
    id: number;
    username: string;
    fullName: string;
    [key: string]: any;
}

export async function createToken(payload: UserPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as unknown as UserPayload;
    } catch (error) {
        return null;
    }
}

export async function getAuthUser(): Promise<UserPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) return null;
    
    return await verifyToken(token);
}
