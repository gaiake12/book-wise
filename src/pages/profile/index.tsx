import BookRatingCardProfile from '@/components/bookRatingCardProfile'
import SideBar from '@/components/sideBar'
import Image from 'next/image'
import {
  User,
  MagnifyingGlass,
  Books,
  BookOpen,
  UserList,
  BookmarkSimple,
} from 'phosphor-react'
import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/router'

interface Book {
  name: string
  author: string
  coverUrl: string
  totalPages: number
  primaryCategory: string
}

interface User {
  name: string
  avatarUrl: string
  createdAt: string
}

interface Rating {
  id: string
  rate: number
  description: string
  createdAt: string
  book: Book
}

export default function Profile() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [user, setUser] = useState<User>()

  const [searchText, setSearchText] = useState('')
  const searchedText = useDeferredValue(searchText)

  const router = useRouter()
  const userId = router.query.userId

  function handleSearchText(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setSearchText(value)
  }

  useEffect(() => {
    if (searchedText !== '') {
      api
        .get('/rating/getRecentRatedBooksBySearch', {
          params: { searchedText },
        })
        .then((response) => {
          setRatings(response.data)
        })
    } else {
      api
        .get('/rating/getRecentRatedBooks', {
          params: { userId },
        })
        .then((response) => {
          setRatings(response.data)
        })
    }
  }, [searchedText])

  useEffect(() => {
    if (userId) {
      api
        .get('/rating/getRecentRatedBooks', {
          params: { userId },
        })
        .then((response) => {
          setRatings(response.data)
        })

      api
        .get('/user/getUserById', {
          params: { userId },
        })
        .then((response) => {
          setUser(response.data)
        })
    }
  }, [userId])

  function countReadedAuthors(authors: string[]) {
    const readedAuthors = new Set(authors).size

    return readedAuthors
  }

  function countAllPagesReaded(totalPages: number[]) {
    const totalReadedPages = totalPages.reduce(
      (acc, totalPage) => acc + totalPage,
      0,
    )

    return totalReadedPages
  }

  function setMostReadedCategory(readedCategories: string[]) {
    const hashMapCategories: Record<string, number> = readedCategories.reduce<
      Record<string, number>
    >((acc, category) => {
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {})

    const mostRepeatedValue = Math.max(...Object.values(hashMapCategories))

    const mostReadedCategory = Object.entries(hashMapCategories).find(
      ([_, repeatedTimes]) => repeatedTimes === mostRepeatedValue,
    )

    if (!mostReadedCategory) {
      return null
    }

    return mostReadedCategory[0]
  }

  return (
    <div className="flex">
      <SideBar activePage="profile" />

      <div className="p-16">
        <h1 className="text-gray-100 text-2xl flex gap-2 items-center mb-10">
          <User size={32} className="text-green-100" />
          Perfil
        </h1>

        <div className="w-full flex items-center justify-between h-12 border-gray-500 bg-gray-800 border-2 mb-4 p-3 rounded-md">
          <input
            type="Text"
            placeholder="Buscar livro avaliado"
            className="text-gray-100  flex w-full bg-gray-800 h-full placeholder:text-gray-400 outline-none"
            value={searchText}
            onChange={handleSearchText}
          />

          <MagnifyingGlass size={20} className="text-gray-500" />
        </div>

        <div className="flex flex-col gap-6 w-[42.5rem] overflow-hidden">
          {ratings?.map((rating) => {
            return <BookRatingCardProfile key={rating.id} rating={rating} />
          })}
        </div>
      </div>

      <div className="flex mt-36 flex-col items-center w-full border-l-2 border-gray-700">
        <div className="flex justify-start items-center flex-col h-fit">
          <div className=" h-[4.5rem] w-[4.5rem] rounded-full bg-gradient-to-t from-gradient-from to-gradient-to flex justify-center items-center mb-4">
            <Image
              className="rounded-full "
              src={user ? user.avatarUrl : ''}
              width={68}
              height={68}
              alt="Profile Picture"
            />
          </div>

          <h1 className="text-gray-100 font-semibold text-lg">
            {user ? user.name : ''}
          </h1>
          <span className="text-gray-400 text-sm">
            Desde {user ? new Date(user.createdAt).getFullYear() : ''}
          </span>
        </div>
        <div className="h-1 w-8 bg-gradient-to-r from-gradient-from to-gradient-to my-8 rounded-lg" />

        <div className="h-fit w-full p-10 flex flex-col gap-10 justify-center items-center">
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center">
            <BookOpen size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">
                {countAllPagesReaded(
                  ratings.map((rating) => rating.book.totalPages),
                )}
              </span>
              <p className="text-sm text-gray-400">Páginas lidas</p>
            </div>
          </div>
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center  ">
            <Books size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">{ratings?.length}</span>
              <p className="text-sm text-gray-400">Livros avaliados</p>
            </div>
          </div>
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center ">
            <UserList size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">
                {ratings &&
                  countReadedAuthors(
                    ratings.map((rating) => rating.book.author),
                  )}
              </span>
              <p className="text-sm text-gray-400">Autores lidos</p>
            </div>
          </div>
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center ">
            <BookmarkSimple size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">
                {ratings &&
                  setMostReadedCategory(
                    ratings.map((rating) => rating.book.primaryCategory),
                  )}
              </span>
              <p className="text-sm text-gray-400">Categoria mais lida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
