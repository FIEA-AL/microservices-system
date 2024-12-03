export interface User{
    id : string,
    email : string,

}

export interface UserWithPassword extends User{
    password: string
}

export interface QrCode{
    id : string,
    name : string,
    url: string | null
}