import { BaseApiReponse, User } from "../../types";

export type LoginResponse = BaseApiReponse<User>;
export type LogoutResponse = BaseApiReponse<{}>;
export type RegisterResponse = BaseApiReponse<{}>;
