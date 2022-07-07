import { Post, User } from "@prisma/client";
import { Context } from "..";

export const Query = {
    me: (
        _: any,
        __: any,
        { prisma, userInfo }: Context
    ) => {
        if (!userInfo) return null;
        return prisma.user.findUnique({
            where: {
                id: Number(userInfo.userId)
            }
        })
    },

    profile: (
        _: any,
        { userId }: { userId: string },
        { prisma }: Context
    ) => {
        return prisma.profile.findUnique({
            where: {
                id: Number(userId),
            }
        })
    },

    posts: (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
        return prisma.post.findMany({
            orderBy: [
                {
                    createdAt: "desc"
                },
            ]
        });
    }
}