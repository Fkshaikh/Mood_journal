import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserIdByClerkId = async () => {
  const { userId } = await auth();
  const user = prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });
  return user;
};
