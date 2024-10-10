import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const bookId = String(req.query.bookId)

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      ratings: {
        include: {
          user: true,
        },
      },

      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!book) {
    return res.status(400).end()
  }

  const response = {
    primaryCategory: book.categories[0].category.name,
    secondaryCategory: book.categories[1].category.name,
    ratings: book.ratings.map((rating) => {
      return {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        createdAt: rating.created_at,

        user: {
          id: rating.user.id,
          name: rating.user.name,
          avatarUrl: rating.user.avatar_url,
        },
      }
    }),

    id: book.id,
    author: book.author,
    coverUrl: book.cover_url,
    name: book.name,
    totalPages: book.total_pages,
    summary: book.summary,
  }

  return res.status(200).json(response)
}
