import BookRatingExploreCard from '@/components/bookRatingExploreCard'
import FilterButton from '@/components/filterButton'
import SideBar from '@/components/sideBar'
import { Binoculars, MagnifyingGlass } from 'phosphor-react'
import { api } from '@/lib/axios'
import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react'

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
  ratings: Rating[]
}

interface Category {
  id: string
  name: string
}

export default function Explore() {
  const [bookList, setBookList] = useState<Book[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [searchText, setSearchText] = useState('')
  const searchedText = useDeferredValue(searchText)

  useEffect(() => {})

  useEffect(() => {
    api.get('/books/getBooks').then((response) => {
      setBookList(response.data)
    })

    api.get('/category/getCategories').then((response) => {
      setCategoryList(response.data)
    })
  }, [])

  useEffect(() => {
    if (searchedText !== '') {
      api
        .get('/books/getBooksBySearch', {
          params: { searchedText },
        })
        .then((response) => {
          setBookList(response.data)
        })
    } else {
      api.get('/books/getBooks').then((response) => {
        setBookList(response.data)
      })
    }
  }, [searchedText])

  function handleSearchText(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setSearchText(value)
  }

  async function handleFilterByCategory(searchedCategory: string) {
    if (searchedCategory !== '') {
      api
        .get('/books/getBooksByCategory', {
          params: { searchedCategory },
        })
        .then((response) => setBookList(response.data))
    } else {
      api.get('/books/getBooks').then((response) => {
        setBookList(response.data)
      })
    }
  }

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
              onChange={handleSearchText}
              type="Text"
              placeholder="Buscar livro avaliado"
              className="text-gray-100  flex w-full bg-gray-800 h-full placeholder:text-gray-400 outline-none"
            />

            <MagnifyingGlass size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex w-[62.25rem] my-10 gap-3 overflow-x-scroll scrollbar-hidden">
          <FilterButton
            displayText="Tudo"
            searchCategory={async () => await handleFilterByCategory('')}
          />

          {categoryList.map((category) => {
            return (
              <FilterButton
                key={category.id}
                displayText={category.name}
                searchCategory={async () =>
                  await handleFilterByCategory(category.name)
                }
              />
            )
          })}
        </div>

        <div className="grid w-[62.25rem] grid-cols-3 gap-5 border-collapse ">
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
