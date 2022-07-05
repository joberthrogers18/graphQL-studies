import { Context } from "../../index";
import { User } from '@prisma/client';

interface SignupArgs {
    email: string;
    name: string;
    password: string;
    bio: string;
}

export const authResolvers = {
    signup: async (
        _: any,
        { email, name, password }: SignupArgs,
        { prisma }: Context
    ): Promise<User> => {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
            }
        });

        return user;
    }
};