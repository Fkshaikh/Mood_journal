import { NextResponse } from '@/node_modules/next/server'
import { getUserIdByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = getUserIdByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: (await user).id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  return NextResponse.json({ data: updatedEntry })
}
