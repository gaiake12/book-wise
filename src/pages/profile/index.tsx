import BookRatingCardProfile from '@/components/bookRatingCardProfile'
import SideBar from '@/components/sideBar'
import profileImage from '@/../../assets/profile-image.jpg'
import Image from 'next/image'
import {
  User,
  MagnifyingGlass,
  Books,
  BookOpen,
  UserList,
  BookmarkSimple,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface Book {
  name: string
  author: string
  coverUrl: string
  totalPages: number
  primaryCategory: string
  secondaryCategory: string
}

interface User {
  name: string
  avataUrl: string
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
  const [ratings, setRatings] = useState<Rating[]>()
  const [user, setUser] = useState<User>()

  const { data } = useSession()

  useEffect(() => {
    if (data) {
      api
        .get('/rating/getRecentRatedBooks', {
          params: { userId: data.user.id },
        })
        .then((response) => {
          console.log(response.data)
          setRatings(response.data)
        })

      api
        .get('/user/getUserById', {
          params: { userId: data.user.id },
        })
        .then((response) => {
          console.log(response.data)
          setUser(response.data)
        })
    }
  }, [data?.user.id, data])

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
              src={user?.avataUrl || ''}
              width={68}
              height={68}
              alt="Profile Picture"
            />
          </div>

          <h1 className="text-gray-100 font-semibold text-lg">
            {user ? user.name : ''}
          </h1>
          <span className="text-gray-400 text-sm">
            {user
              ? formatDistanceToNow(new Date(user?.createdAt), {
                  locale: ptBR,
                })
              : ''}
          </span>
        </div>
        <div className="h-1 w-8 bg-gradient-to-r from-gradient-from to-gradient-to my-8 rounded-lg" />

        <div className="h-fit w-full p-10 flex flex-col gap-10 justify-center items-center">
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center">
            <BookOpen size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">3853</span>
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
              <span className="font-semibold">8</span>
              <p className="text-sm text-gray-400">Autores lidos</p>
            </div>
          </div>
          <div className="w-48 h-fit flex gap-5 text-gray-100 items-center ">
            <BookmarkSimple size={32} className="text-green-100" />
            <div className="flex flex-col ">
              <span className="font-semibold">Computação</span>
              <p className="text-sm text-gray-400">Categoria mais lida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
