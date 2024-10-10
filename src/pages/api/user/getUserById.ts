import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = String(req.query.userId)

  if (!userId) {
    return res.status(405).end()
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return res.status(200).json({
    name: user?.name,
    avatarUrl: user?.avatar_url,
    createdAt: user?.created_at,
  })
}
