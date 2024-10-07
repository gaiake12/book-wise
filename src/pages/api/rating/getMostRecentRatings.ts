import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const allMostRecentRatingsAux = await prisma.rating.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 5,
    include: {
      book: true,
      user: true,
    },
  })

  const allMostRecentRatings = allMostRecentRatingsAux.map((rating) => {
    return {
      id: rating.id,
      rate: rating.rate,
      createdAt: rating.created_at,
      book: {
        name: rating.book.name,
        author: rating.book.author,
        summary: rating.book.summary,
        coverUrl: rating.book.cover_url,
      },
      user: {
        id: rating.user.id,
        name: rating.user.name,
        avatarUrl: rating.user.avatar_url,
      },
    }
  })

  return res.status(200).json(allMostRecentRatings)
}
