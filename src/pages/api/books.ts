import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const allBooksAux = await prisma.book.findMany()

  const allBooks = allBooksAux.map((book) => {
    return {
      author: book.author,
      coverUrl: book.cover_url,
      name: book.name,
      totalPages: book.total_pages,
      summary: book.summary,
    }
  })

  return res.status(200).json(allBooks)
}
