export type Rol = 'USER' | 'ADMIN' | 'WAITER' | 'CHEF';

export interface SignupPayload {
    username: string;
    password: string;
    name: string;
    lastname: string;
    rol: Rol;
    permissions: number[];
}
