import { Post } from "@prisma/client";
import { Context } from "../index";

interface postCreateArgs {
    title: string;
    content: string;
}

interface postPayloadType {
    userErrors: {
        message: string
    }[]
    post: Post | null
}

export const Mutation = {
    postCreate: async (
        _: any, { title, content }: postCreateArgs,
        { prisma }: Context
    ): Promise<postPayloadType> => {
        if (!title || !content) {
            return {
                userErrors: [{
                    message: "You must provide a title and a content ot create a post"
                }],
                post: null
            }
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: 1
            }
        });

        return {
            userErrors: [],
            post
        }
    }
} 