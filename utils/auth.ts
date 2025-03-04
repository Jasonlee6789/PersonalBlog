import { SHA256 } from 'crypto-js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key-jing-lee-blog';
const TOKEN_EXPIRY = '24h';

export function hashPassword(password: string): string {
  return SHA256(password).toString();
}

export function generateToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
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