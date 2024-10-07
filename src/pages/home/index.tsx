import BookRatingCard from '@/components/bookRatingCard'
import BookRatingSmallCard from '@/components/bookRatingSmallCard'
import SideBar from '@/components/sideBar'
import { api } from '@/lib/axios'
import Link from 'next/link'
import { ChartLineUp, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'

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

interface Rating {
  id: string
  rate: number
  createdAt: string
  book: Book
  user: User
}

export default function Home() {
  const [mostRecentRatings, setMostRecentRatings] = useState<Rating[]>()

  useEffect(() => {
    api.get('/rating/getMostRecentRatings').then((response) => {
      console.log(response.data)
      setMostRecentRatings(response.data)
    })
  }, [])

  return (
    <div className="flex">
      <SideBar activePage="home" />

      <div className="p-16">
        <h1 className="text-gray-100 text-2xl flex gap-2 items-center mb-10">
          <ChartLineUp size={32} className="text-green-100" />
          Início
        </h1>

        <span className="text-gray-100 mb-4 flex">
          Avaliações mais recentes
        </span>

        <div className="flex flex-col gap-3 w-[42.5rem] overflow-hidden">
          {mostRecentRatings?.map((rating) => {
            return <BookRatingCard key={rating.id} rating={rating} />
          })}
        </div>
      </div>

      <div className="flex mt-36 flex-col w-80 gap-6">
        <header className="flex items-center justify-between">
          <span className="text-gray-100 text-sm">Livros Populares</span>
          <Link
            className="text-purple-100 flex gap-1 items-center justify-center text-sm font-bold"
            href="/explore"
          >
            Ver todos <CaretRight />
          </Link>
        </header>

        <div className="flex flex-col gap-3">
          <BookRatingSmallCard />
          <BookRatingSmallCard />
          <BookRatingSmallCard />
          <BookRatingSmallCard />
        </div>
      </div>
    </div>
  )
}
