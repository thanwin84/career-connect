import { BaseApiReponse, User } from '.';

export type LoginResponse = BaseApiReponse<User>;
export type LogoutResponse = BaseApiReponse<{}>;
export type RegisterResponse = BaseApiReponse<{}>;
