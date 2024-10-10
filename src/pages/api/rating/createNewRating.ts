import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { userId, bookId, rate, description } = req.body

  if (!userId || !bookId || !rate || !description) {
    return res.status(405).end()
  }

  const newRating = await prisma.rating.create({
    data: {
      rate,
      description,
      user: {
        connect: { id: userId },
      },
      book: {
        connect: {
          id: bookId,
        },
      },
    },
  })

  return res.status(200).json(newRating)
}
