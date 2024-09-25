import BookRatingCard from '@/components/bookRatingCard'
import BookRatingSmallCard from '@/components/bookRatingSmallCard'
import SideBar from '@/components/sideBar'
import Link from 'next/link'
import { ChartLineUp, CaretRight } from 'phosphor-react'

export default function Home() {
  return (
    <div className="flex">
      <SideBar activePage="home" logedIn={false} />

      <div className="p-16">
        <h1 className="text-gray-100 text-2xl flex gap-2 items-center mb-10">
          <ChartLineUp size={32} className="text-green-100" />
          Início
        </h1>

        <span className="text-gray-100 mb-4 flex">
          Avaliações mais recentes
        </span>

        <div className="flex flex-col gap-3 w-[42.5rem] overflow-hidden">
          <BookRatingCard />
          <BookRatingCard />
          <BookRatingCard />
          <BookRatingCard />
          <BookRatingCard />
          <BookRatingCard />
          <BookRatingCard />
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
