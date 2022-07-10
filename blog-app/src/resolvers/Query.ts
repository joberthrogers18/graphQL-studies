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

    profile: async (
        _: any,
        { userId }: { userId: string },
        { prisma, userInfo }: Context
    ) => {
        const isMyProfile = Number(userId) === Number(userInfo?.userId);

        const profile = await prisma.profile.findUnique({
            where: {
                userId: Number(userId),
            }
        });

        if (!profile) return null;

        return {
            ...profile,
            isMyProfile
        }
    },

    posts: (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
        return prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: [
                {
                    createdAt: "desc"
                },
            ]
        });
    }
}