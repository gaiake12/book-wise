import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import UseCalcRating from '@/hooks/useCalcRating'

interface User {
  id: string
  name: string
  avatarUrl: string
}

interface Book {
  name: string
  author: string
  summary: string
  coverUrl: string
}

interface BookRatingCardProps {
  rating: {
    id: string
    rate: number
    createdAt: string
    book: Book
    user: User
  }
}

export default function BookRatingCard({ rating }: BookRatingCardProps) {
  const { rate, createdAt, book, user } = rating

  return (
    <div className="w-[42.5rem] h-fit p-6 bg-gray-700 rounded-md">
      <header className="flex gap-4 w-full h-12 justify-between">
        <div className="flex gap-4 items-start justify-center">
          <Image
            className="rounded-full w-10 h-10 object-cover"
            src={user?.avatarUrl}
            width={40}
            height={40}
            alt="Profile Image"
          />

          <div>
            <span className="text-gray-100">{user?.name}</span>
            <p className="text-gray-400 text-sm">
              {formatDistanceToNow(new Date(createdAt), {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-1 text-purple-100">
          {UseCalcRating(rate || null)}
        </div>
      </header>

      <div className="flex mt-6 gap-5">
        <Image
          src={book.coverUrl}
          width={108}
          height={152}
          className=""
          alt="book Image"
        />

        <div className="flex flex-col">
          <h1 className="text-gray-100 font-bold">{book.name}</h1>
          <span className="text-gray-400 text-sm">{book.author}</span>

          <p className="mt-5 text-gray-300">{book.summary}</p>
        </div>
      </div>
    </div>
  )
}
