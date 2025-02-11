export interface UserState {
    data: UserModel | null;
}

export interface UserModel {
    id: number
    email: string
    telephone?: string
    forename: string
    surname?: string
    gender?: string
    picture?: string
    updatedAt?: Date
    createdAt: Date
}