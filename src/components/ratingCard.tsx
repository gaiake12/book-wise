import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import UseCalcRating from '@/hooks/useCalcRating'

interface Rating {
  rate: number
  description: string
  createdAt: string
  userName: string
  userAvatarUrl: string
}

export function RatingCard({
  rate,
  description,
  createdAt,
  userName,
  userAvatarUrl,
}: Rating) {
  return (
    <div className="w-full h-fit min-h-36 p-6 bg-gray-700 rounded-md">
      <header className="flex gap-4 w-full h-12 justify-between">
        <div className="flex gap-4 items-start justify-center">
          <Image
            className="rounded-full w-10 h-10 object-cover"
            src={userAvatarUrl}
            width={40}
            height={40}
            alt="Profile Image"
          />

          <div>
            <span className="text-gray-100">{userName}</span>
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
