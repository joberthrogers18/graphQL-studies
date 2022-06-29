import { Context } from "../index";

interface postCreateArgs {
    title: string;
    content: string;
}

export const Mutation = {
    postCreate: async (_: any, {title, content}: postCreateArgs, {prisma}: Context) => {
        prisma.post.create({
            data: {
                title,
                content,
                authorId: 1
            }
        });
    }
} 