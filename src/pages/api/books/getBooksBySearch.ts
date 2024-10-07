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

  const booksAux = await prisma.book.findMany({
    include: {
      ratings: true,
    },
    where: {
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
  })

  const books = booksAux.map((book) => {
    return {
      id: book.id,
      author: book.author,
      coverUrl: book.cover_url,
      name: book.name,
      totalPages: book.total_pages,
      summary: book.summary,
      ratings: book.ratings,
    }
  })

  return res.status(200).json(books)
}
