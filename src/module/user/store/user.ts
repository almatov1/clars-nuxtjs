import { defineStore } from 'pinia'
import type { UserModel, UserState } from '../model/UserModel';

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        data: null,
    }),
    actions: {
        set(value: UserModel) {
            this.data = value;
        },
        updatePicture(picture: string) {
            if (!this.data) return;
            this.data.picture = picture;
        },
        updateData(email: string, telephone: string, forename: string, surname: string, gender: string) {
            if (!this.data) return;
            this.data.email = email;
            this.data.telephone = telephone;
            this.data.forename = forename;
            this.data.surname = surname;
            this.data.gender = gender;
        },
        reset() {
            this.data = null;
        }
    }
})