export interface Auth {
    name: string,
    password: string
}

export interface AuthResponse {
    ok?: boolean,
    uid?: string,
    name?: string,
    token?: string,
    msg?: string
}

