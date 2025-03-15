import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
};
