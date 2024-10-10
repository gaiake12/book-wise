import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const mostPopularBooksAux = await prisma.book.findMany({
    include: {
      ratings: true,
    },
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    take: 4,
  })

  const mostPopularBooks = mostPopularBooksAux.map((book) => {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      coverUrl: book.cover_url,
      ratings: book.ratings,
    }
  })

  return res.status(200).json(mostPopularBooks)
}
