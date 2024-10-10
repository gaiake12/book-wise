import Image from 'next/image'

import UseCalcAverageRating from '@/hooks/useCalcAvarageRating'

interface Rating {
  id: string
  rate: number
}

interface BookRatingSmallCardProps {
  book: {
    id: string
    name: string
    author: string
    coverUrl: string
    ratings: Rating[]
  }
}

export default function BookRatingSmallCard({
  book,
}: BookRatingSmallCardProps) {
  const { name, author, ratings, coverUrl } = book

  return (
    <div className="w-80 h-[8.125rem] bg-gray-700 rounded-md pt-4 pb-4 pl-5 pr-5 flex gap-5 m-auto">
      <Image src={coverUrl || ''} width={64} height={94} alt="book cover" />
      <div className="flex flex-col">
        <span className="text-gray-100 font-bold">{name}</span>
        <span className="text-gray-400">{author}</span>

        <div className="flex justify-start items-center text-purple-100 gap-1 mt-auto">
          {UseCalcAverageRating(ratings)}
        </div>
      </div>
    </div>
  )
}
