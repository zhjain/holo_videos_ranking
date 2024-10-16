export interface User {
    id: string;
    username: string;
    isAdmin: boolean;
}

export interface UserWithToken {
    user: User;
    token: string;
}


