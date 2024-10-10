import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookmarkSimple, BookOpen, Check, Star, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import UseCalcAverageRating from '@/hooks/useCalcAvarageRating'
import { RatingCard } from './ratingCard'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

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

const ratingFormSchema = z.object({
  description: z.string().min(50, {
    message: 'A descrição da avaliação deve ter ao menos 100 caracteres',
  }),
})

type RatingFormData = z.infer<typeof ratingFormSchema>

export function BookDetailCard({ bookId }: BookDetailCardProps) {
  const [book, setBook] = useState<Book>()
  const [rate, setRate] = useState<number>(0)
  const [showRatingBox, setShowRatingBox] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingFormSchema),
  })

  const { data: session, status } = useSession()

  const isSignedIn = status === 'authenticated'

  useEffect(() => {
    api
      .get('/books/getBookById', {
        params: { bookId },
      })
      .then((response) => {
        setBook(response.data)
      })
  }, [bookId])

  function handleCreateNewRating(data: RatingFormData) {
    const { description } = data

    console.log(rate, description, session?.user.id, bookId)

    api
      .post('/rating/createNewRating', {
        rate,
        description,
        userId: session?.user.id,
        bookId,
      })
      .then()

    handleCancelForm()
  }

  function handleCancelForm() {
    setRate(0)
    setShowRatingBox(false)
    setValue('description', '')
  }

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
        {!showRatingBox && isSignedIn && (
          <button
            onClick={() => setShowRatingBox(true)}
            className="text-purple-100 font-semibold"
          >
            Avaliar
          </button>
        )}

        {/* </DialogTrigger>
          <LoginAlert />
        </Dialog> */}
      </div>

      {showRatingBox && (
        <form
          onSubmit={handleSubmit(handleCreateNewRating)}
          className="w-full h-[20.5rem] p-6 bg-gray-700"
        >
          <header className="flex gap-4 w-full h-12 justify-between">
            <div className="flex gap-4 items-start justify-center">
              <Image
                className="rounded-full w-10 h-10 object-cover"
                src={session ? session.user.avatar_url : ''}
                width={40}
                height={40}
                alt="Profile Image"
              />

              <div>
                <span className="text-gray-100 font-semibold">
                  {session?.user.name}
                </span>
              </div>
            </div>
            <div className="flex gap-1 text-purple-100">
              {Array.from({ length: 6 }).map((_, i) => {
                if (i > 0 && i <= rate) {
                  return (
                    <Star
                      className="text-purple cursor-pointer"
                      key={i}
                      width={28}
                      height={28}
                      onClick={() => setRate(i)}
                      weight="fill"
                    />
                  )
                }

                if (i > 0) {
                  return (
                    <Star
                      className="text-purple cursor-pointer"
                      key={i}
                      width={28}
                      height={28}
                      onClick={() => setRate(i)}
                    />
                  )
                }
                return null
              })}
            </div>
          </header>

          <textarea
            className="w-full h-40 text-gray-200 placeholder:text-gray-400 px-5 py-4
           bg-gray-800 border-gray-500 rounded-md mt-6 outline-none border-2"
            {...register('description')}
          />

          <div className="w-full flex justify-end gap-2 mt-3">
            <button
              className="p-1 h-9 w-9 bg-gray-600 flex justify-center items-center rounded-md hover:bg-gray-500"
              onClick={handleCancelForm}
            >
              <X className="text-purple-100" width={24} height={24} />
            </button>
            <button
              className="p-1 h-9 w-9 bg-gray-600 flex justify-center items-center rounded-md hover:bg-gray-500"
              type="submit"
              disabled={isSubmitting}
            >
              <Check className="text-green-100" width={24} height={24} />
            </button>
          </div>
        </form>
      )}
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
