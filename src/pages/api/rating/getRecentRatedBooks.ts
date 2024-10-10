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

  const allMostRecentRatingsAux = await prisma.rating.findMany({
    where: {
      user: {
        id: userId,
      },
    },

    include: {
      user: true,
      book: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      },
    },

    orderBy: {
      created_at: 'desc',
    },
  })

  const userAndMostRecentRatings = allMostRecentRatingsAux.map((rating) => {
    return {
      id: rating.id,
      rate: rating.rate,
      description: rating.description,
      createdAt: rating.created_at,
      book: {
        name: rating.book.name,
        author: rating.book.author,
        coverUrl: rating.book.cover_url,
        totalPages: rating.book.total_pages,
        primaryCategory: rating.book.categories[0].category,
        secondaryCategory: rating.book.categories[1].category,
      },
    }
  })

  return res.status(200).json(userAndMostRecentRatings)
}
