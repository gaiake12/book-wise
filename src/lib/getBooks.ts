import { prisma } from './prisma'

export async function findBooks() {
  const { data } = prisma.book.findMany({
    include: {
      ratings: true,
    },
  })

  return data
}
