import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import UseCalcRating from '@/hooks/useCalcRating'

interface Book {
  name: string
  author: string
  coverUrl: string
}

interface Rating {
  rate: number
  description: string
  createdAt: string
  book: Book
}

interface BookRatingCardProfileProps {
  rating: Rating
}

export default function BookRatingCardProfile({
  rating,
}: BookRatingCardProfileProps) {
  const { rate, description, createdAt, book } = rating

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400">
        Há{' '}
        {formatDistanceToNow(new Date(createdAt), {
          locale: ptBR,
        })}
      </span>
      <div className="w-[42.5rem] h-fit p-6 bg-gray-700 rounded-md">
        <div className="flex flex-col gap-5 p-4">
          <div className="flex gap-6">
            <Image
              src={book.coverUrl || ''}
              width={98}
              height={134}
              alt="book Image"
            />

            <div className="flex flex-col">
              <h1 className="text-gray-100 font-bold">{book.name}</h1>
              <span className="text-gray-400 text-sm">{book.author}</span>

              <div className="flex gap-1 mt-auto text-purple-100">
                {UseCalcRating(rate)}
              </div>
            </div>
          </div>
          <p className="mt-5 text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  )
}
