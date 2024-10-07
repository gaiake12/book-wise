import Image from 'next/image'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { BookDetailCard } from './bookDetailCard'
import UseCalcAverageRating from '@/hooks/useCalcAvarageRating'

interface Rating {
  id: string
  rate: number
  description: string
  createdAt: string
  userName: string
  userAvatarUrl: string
}

interface BookRatingExploreCardProps {
  id: string
  author: string
  name: string
  coverUrl: string
  ratings: Rating[]
}

export default function BookRatingExploreCard({
  id,
  author,
  name,
  coverUrl,
  ratings,
}: BookRatingExploreCardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <div className="w-80 h-[11.5rem] bg-gray-700 rounded-md pt-4 pb-4 pl-5 pr-5 flex gap-5 m-auto">
            <Image src={coverUrl} width={108} height={152} alt="book cover" />
            <div className="flex flex-col items-start">
              <span className="text-gray-100 font-bold text-left">{name}</span>
              <span className="text-gray-400">{author}</span>

              <div className="flex justify-start items-center text-purple-100 gap-1 mt-auto">
                {UseCalcAverageRating(ratings)}
              </div>
            </div>
          </div>
        </button>
      </SheetTrigger>

      <SheetContent className="bg-gray-800 max-w-[41.25rem] border-none overflow-y-auto px-12">
        <SheetTitle about="Book Detail Card" />
        <BookDetailCard bookId={id} />
      </SheetContent>
    </Sheet>
  )
}
