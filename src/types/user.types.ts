export interface BasicUser {
    name: string,
    email: string,
    password: string
}
  
export interface User extends BasicUser {
    id: number,
}

export interface Email {
  email: string
}

export interface Code {
    code: string,
    email: string
}

export interface Forgot {
    code: string,
    password: string
}