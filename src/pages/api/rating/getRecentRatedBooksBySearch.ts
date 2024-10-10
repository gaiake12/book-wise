import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const params = String(req.query.searchedText)

  if (!params) {
    return res.status(405).end()
  }

  const ratingsAux = await prisma.rating.findMany({
    include: {
      book: true,
    },
    where: {
      book: {
        OR: [
          {
            name: {
              contains: params,
            },
          },
          {
            author: {
              contains: params,
            },
          },
          {
            summary: {
              contains: params,
            },
          },
        ],
      },
    },
  })

  const ratings = ratingsAux.map((rating) => {
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
      },
    }
  })

  return res.status(200).json(ratings)
}
