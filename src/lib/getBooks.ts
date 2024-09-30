import { prisma } from './prisma'

export async function findBooks() {
  const { data } = prisma.book.findMany()

  return data
}
