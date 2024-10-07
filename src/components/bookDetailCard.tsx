import Image from 'next/image'
import { BookmarkSimple, BookOpen } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import UseCalcAverageRating from '@/hooks/useCalcAvarageRating'
import { RatingCard } from './ratingCard'

interface BookDetailCardProps {
  bookId: string
}

interface Rating {
  id: string
  rate: number
  description: string
  createdAt: string
  userName: string
  userAvatarUrl: string
}

interface Book {
  id: string
  author: string
  summary: string
  name: string
  totalPages: number
  coverUrl: string
  primaryCategory: string
  secondaryCategory: string
  ratings: Rating[]
}

export function BookDetailCard({ bookId }: BookDetailCardProps) {
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    api
      .get('/books/getBook', {
        params: { bookId },
      })
      .then((response) => {
        setBook(response.data)
      })
  }, [bookId])

  return (
    <div>
      <div className="w-full h-[25.875rem] bg-gray-700 px-8 py-6 rounded-md">
        <div className="w-full h-60 rounded-md flex gap-5 m-auto">
          <Image
            src={
              book?.coverUrl ? book.coverUrl : '/images/books/codigo-limpo.png'
            }
            width={171}
            height={242}
            alt="book corver"
          />
          <div className="flex flex-col items-start gap-2">
            <span className="text-gray-100 text-lg font-semibold text-left">
              {book?.name}
            </span>
            <span className="text-gray-400">{book?.author}</span>

            <div className="flex justify-start items-center text-purple-100 gap-1 mt-auto">
              {book?.ratings ? UseCalcAverageRating(book.ratings) : ''}
            </div>
            <span className="text-gray-400 text-sm">
              {book?.ratings.length} avaliações
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center w-full gap-14 border-t-2 border-gray-600 h-24">
          <div className="w-full h-fit flex gap-5 text-gray-100 items-center ">
            <BookmarkSimple size={24} className="text-green-100" />
            <div className="flex flex-col ">
              <p className="text-sm text-gray-400">Categoria</p>
              <span className="font-semibold">
                {book?.primaryCategory}, {book?.secondaryCategory}
              </span>
            </div>
          </div>

          <div className="w-full h-fit flex gap-5 text-gray-100 items-center ">
            <BookOpen size={24} className="text-green-100" />
            <div className="flex flex-col ">
              <p className="text-sm text-gray-400">Páginas</p>
              <span className="font-semibold">{book?.totalPages}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center mt-10 text-gray-200">
        <span>Avaliações</span>
        {/* <Dialog>
          <DialogTrigger asChild> */}
        <button className="text-purple-100 font-semibold">Avaliar</button>
        {/* </DialogTrigger>
          <LoginAlert />
        </Dialog> */}
      </div>
      <div className="flex flex-col w-full h-fit mt-4 gap-3">
        {book?.ratings.map((rating) => {
          return (
            <RatingCard
              key={rating.id}
              createdAt={rating.createdAt}
              rate={rating.rate}
              description={rating.description}
              userName={rating.userName}
              userAvatarUrl={rating.userAvatarUrl}
            />
          )
        })}
      </div>
    </div>
  )
}
