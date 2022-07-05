import { Context } from "../../index";
import { User } from '@prisma/client';
import validator from 'validator';

interface SignupArgs {
    email: string;
    name: string;
    password: string;
    bio: string;
}

interface authPayloadType {
    userErrors: {
        message: string
    }[]
    user: User | null
}

export const authResolvers = {
    signup: async (
        _: any,
        { email, name, password, bio }: SignupArgs,
        { prisma }: Context
    ): Promise<authPayloadType> => {
        let errors: { message: string }[] = [];

        if (!validator.isEmail(email)) {
            errors.push({
                message: 'Invalid email!'
            });
        }


        if (!validator.isLength(password, { min: 5 })) {
            errors.push({
                message: 'Password must have at least 5 characters!'
            });
        }

        if (!name) {
            errors.push({
                message: 'The name cannot be blank!'
            });
        }

        if (!bio) {
            errors.push({
                message: 'The bio cannot be blank!'
            });
        }

        if (errors.length > 0) {
            return {
                userErrors: errors,
                user: null,
            }
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
            }
        });

        return {
            userErrors: [],
            user,
        };
    }
};