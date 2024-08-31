import { customFetch } from "./utils";

export const getUserInformation = ()=> customFetch.get('/users/current-user').then(res => res.data)