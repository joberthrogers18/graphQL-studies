import { Post } from "@prisma/client";
import { Context } from "../../index";
import { canUserMutatePost } from "../Utils/canUserMutatePost";

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

export const postResolvers = {
    postCreate: async (
        _: any, { post }: postArgs,
        { prisma, userInfo }: Context
    ): Promise<postPayloadType> => {
        if (!userInfo) {
            return {
                userErrors: [{
                    message: 'Forbidden access (unauthenticated)'
                }],
                post: null
            }
        }

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
                authorId: userInfo.userId
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
        { prisma, userInfo }: Context
    ): Promise<postPayloadType> => {
        if (!userInfo) {
            return {
                userErrors: [{
                    message: 'Forbidden access (unauthenticated)'
                }],
                post: null
            }
        }

        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma
        });

        if (error) {
            return error;
        }

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
    },

    postDelete: async (
        _: any,
        { postId }: { postId: string },
        { prisma, userInfo }: Context
    ): Promise<postPayloadType> => {
        if (!userInfo) {
            return {
                userErrors: [{
                    message: 'Forbidden access (unauthenticated)'
                }],
                post: null
            }
        }

        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma
        });

        if (error) {
            return error;
        }

        const existingPost = await prisma.post.findUnique({
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

        const response = await prisma.post.delete({
            where: {
                id: parseInt(postId)
            }
        });

        return {
            userErrors: [],
            post: response
        }
    },

    signup: (
        _: any,
        { }
    ) => {
        return
    }
} 