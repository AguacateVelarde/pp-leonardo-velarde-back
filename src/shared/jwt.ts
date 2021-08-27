import jwt from 'jsonwebtoken';
const SECRET_KEY = 'askfhbqufy1go5fygpwiuhvwpeiruheiuewhpiñq3ruhqriuhbfiur';

export const validatedJWT = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

export const createJWT = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY);
};
