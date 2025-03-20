import { BaseApiReponse } from './common';
import { User } from './user';

export type LoginResponse = BaseApiReponse<User>;
export type LogoutResponse = BaseApiReponse<{}>;
export type RegisterResponse = BaseApiReponse<{}>;
