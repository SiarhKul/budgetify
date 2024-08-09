import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../schemas/user.schema';

export type TJwtPayload = JwtPayload & Omit<User, 'password'>;
