import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const allBooksAux = await prisma.book.findMany({
    include: {
      ratings: true,
    },
  })

  const allBooks = allBooksAux.map((book) => {
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

  return res.status(200).json(allBooks)
}
