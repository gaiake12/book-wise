import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { categories } from '../../../../prisma/constants/categories'

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
      ratings: true,
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

  return res.status(200).json({
    primaryCategory: book.categories[0].category.name,
    secondaryCategory: book.categories[1].category.name,
    ratings: book.ratings,

    id: book.id,
    author: book.author,
    coverUrl: book.cover_url,
    name: book.name,
    totalPages: book.total_pages,
    summary: book.summary,
  })
}
