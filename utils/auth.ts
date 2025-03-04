'use client';

import { SHA256 } from 'crypto-js';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode('your-secret-key-jing-lee-blog');
const TOKEN_EXPIRY = '24h';

export function hashPassword(password: string): string {
  return SHA256(password).toString();
}

export async function generateToken(username: string): Promise<string> {
  const jwt = await new jose.SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
  return jwt;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jose.jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// 存储用户信息
export const USER_INFO = {
  username: 'lijing',
  // 预先计算的密码哈希值
  passwordHash: hashPassword('liijing870425'),
};