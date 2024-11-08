interface RegisterData {
    username: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface User {
    username: string,
    jwtToken: string,
    roles?: string[]
}
