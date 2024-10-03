import BookRatingExploreCard from '@/components/bookRatingExploreCard'
import FilterButton from '@/components/filterButton'
import SideBar from '@/components/sideBar'
import { Binoculars, MagnifyingGlass } from 'phosphor-react'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Rating {
  rate: number
  description: string
}

interface Book {
  id: string
  author: string
  summary: string
  name: string
  totalPages: number
  coverUrl: string
  ratings: Rating[]
}

export default function Explore() {
  const [bookList, setBookList] = useState<Book[]>([])

  useEffect(() => {
    api.get('/books/getBooks').then((response) => {
      setBookList(response.data)
    })
  }, [])

  return (
    <div className="flex">
      <SideBar activePage="explore" />
      <div className="mt-16 px-12">
        <div className="flex justify-between w-full">
          <h1 className="text-gray-100 text-2xl flex gap-2 items-center mb-10">
            <Binoculars size={32} className="text-green-100" />
            Explorar
          </h1>

          <div className="w-[27rem] flex items-center justify-between h-12 border-gray-500 bg-gray-800 border-2 mb-4 p-3 rounded-md">
            <input
              type="Text"
              placeholder="Buscar livro avaliado"
              className="text-gray-100  flex w-full bg-gray-800 h-full placeholder:text-gray-400 outline-none"
            />

            <MagnifyingGlass size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex my-10 gap-3">
          <FilterButton displayText="Tudo" />

          <FilterButton displayText="Computação" />
          <FilterButton displayText="Educação" />
          <FilterButton displayText="Fantasia" />
          <FilterButton displayText="Ficção científica" />
          <FilterButton displayText="Horror" />
          <FilterButton displayText="HQs" />
          <FilterButton displayText="Suspense" />
        </div>

        <div className="grid w-[62.25rem] grid-cols-3 gap-5 border-collapse">
          {bookList.map((book) => (
            <BookRatingExploreCard
              key={book.id}
              id={book.id}
              author={book.author}
              name={book.name}
              coverUrl={book.coverUrl}
              ratings={book.ratings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
