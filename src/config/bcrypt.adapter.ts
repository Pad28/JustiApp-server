import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptjsAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync(15);
        return hashSync(password, salt);
    },
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed);
    }
}