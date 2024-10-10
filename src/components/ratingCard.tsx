import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import UseCalcRating from '@/hooks/useCalcRating'
import Link from 'next/link'

interface User {
  id: string
  name: string
  avatarUrl: string
}

interface Rating {
  rate: number
  description: string
  createdAt: string
  user: User
}

export function RatingCard({ rate, description, createdAt, user }: Rating) {
  return (
    <div className="w-full h-fit min-h-36 p-6 bg-gray-700 rounded-md">
      <header className="flex gap-4 w-full h-12 justify-between">
        <div className="flex gap-4 items-start justify-center">
          <Link href={`profile?userId=${user.id}`}>
            <Image
              className="rounded-full w-10 h-10 object-cover"
              src={user.avatarUrl}
              width={40}
              height={40}
              alt="Profile Image"
            />
          </Link>

          <div>
            <span className="text-gray-100">{user.name}</span>
            <p className="text-gray-400 text-sm">
              Há {formatDistanceToNow(new Date(createdAt), { locale: ptBR })}
            </p>
          </div>
        </div>
        <div className="flex gap-1 text-purple-100">{UseCalcRating(rate)}</div>
      </header>

      <p className="mt-5 text-sm text-gray-300">{description}</p>
    </div>
  )
}
