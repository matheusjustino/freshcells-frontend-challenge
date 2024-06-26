export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    blocked: boolean;
    token?: string;
}
