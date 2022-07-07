import { Context } from "..";

interface PostParentType {
    authorId: number;
}

export const Post = {
    user: (
        parent: PostParentType,
        __: any,
        { prisma, userInfo }: Context
    ) => {
        return prisma.user.findUnique({
            where: {
                id: parent.authorId
            }
        });
    },
}