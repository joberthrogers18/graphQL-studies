import { Post } from "@prisma/client";
import { Context } from "../index";

interface postArgs {
    post: {
        title?: string;
        content?: string;
    },
}

interface postPayloadType {
    userErrors: {
        message: string
    }[]
    post: Post | null
}

export const Mutation = {
    postCreate: async (
        _: any, { post }: postArgs,
        { prisma }: Context
    ): Promise<postPayloadType> => {
        const { title, content } = post;

        if (!title || !content) {
            return {
                userErrors: [{
                    message: "You must provide a title and a content ot create a post"
                }],
                post: null
            }
        }

        const response = await prisma.post.create({
            data: {
                title,
                content,
                authorId: 1
            }
        });

        return {
            userErrors: [],
            post: response
        }
    },

    postUpdate: async (
        _: any,
        { postId, post }: { postId: string, post: postArgs["post"] },
        { prisma }: Context
    ): Promise<postPayloadType> => {
        const { title, content } = post;

        if (!title && !content) {
            return {
                userErrors: [{
                    message: 'You must provide a valid title or content to update values'
                }],
                post: null
            }
        }

        const existingPost = prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        })

        if (!existingPost) {
            return {
                userErrors: [{
                    message: "The post does not exists in database!"
                }],
                post: null
            }
        }

        let payloadToUpdate = {
            title,
            content
        }

        if (!title) delete payloadToUpdate.title;
        if (!content) delete payloadToUpdate.content;

        const response = await prisma.post.update({
            data: {
                ...payloadToUpdate
            },
            where: {
                id: parseInt(postId)
            }
        });

        return {
            userErrors: [],
            post: response
        }
    }
} 