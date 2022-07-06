import { Context } from "../../index";
import { User } from '@prisma/client';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

interface SignupArgs {
    credentials: {
        email: string;
        password: string;
    }
    name: string;
    bio: string;
}

interface SigninArgs {
    credentials: {
        email: string;
        password: string;
    }
}

interface authPayloadType {
    userErrors: {
        message: string
    }[]
    token: string | null
}

export const authResolvers = {
    signup: async (
        _: any,
        { credentials, name, bio }: SignupArgs,
        { prisma }: Context
    ): Promise<authPayloadType> => {
        let errors: { message: string }[] = [];
        const { email, password } = credentials;

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
                token: null,
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        });

        await prisma.profile.create({
            data: {
                bio,
                userId: user.id
            }
        });

        const token = await JWT.sign({
            userId: user.id,
            email: user.email
        }, process.env.JWT_SIGNATURE as string, {
            expiresIn: 3600000,
        })

        return {
            userErrors: [],
            token,
        };
    },

    signin: async (
        _: any,
        { credentials }: SigninArgs,
        { prisma }: Context
    ): Promise<authPayloadType> => {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return {
                userErrors: [{
                    message: 'Invalid credentials'
                }],
                token: null,
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                userErrors: [{
                    message: 'Invalid credentials'
                }],
                token: null,
            }
        }

        return {
            userErrors: [],
            token: JWT.sign(
                { userId: user.id },
                process.env.JWT_SIGNATURE as string,
                {
                    expiresIn: 3600000,
                }
            )
        }
    }
};