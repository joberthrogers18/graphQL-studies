import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
    authorId: number;
}

export const Post = {
    user: (
        parent: PostParentType,
        __: any,
        { prisma, userInfo }: Context
    ) => {
        return userLoader.load(parent.authorId);
    },
}