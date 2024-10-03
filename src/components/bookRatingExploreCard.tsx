import Image from 'next/image'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Star } from 'phosphor-react'
import { BookDetailCard } from './bookDetailCard'
import { RatingCard } from './ratingCard'
import { Dialog, DialogTrigger } from './ui/dialog'
import { LoginAlert } from './loginAlert'

interface Rating {
  rate: number
  description: string
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
  function calculateAvarageRating() {
    const avarageRating = Math.floor(
      ratings.reduce((acc, rating) => acc + rating.rate, 0) / ratings.length,
    )

    const stars = []

    for (let i = 1; i < 6; i++) {
      if (i <= avarageRating) {
        stars.push(<Star key={i} size={16} weight="fill" />)
      } else {
        stars.push(<Star key={i} size={16} />)
      }
    }

    return stars
  }

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
                {calculateAvarageRating()}
              </div>
            </div>
          </div>
        </button>
      </SheetTrigger>

      <SheetContent className="bg-gray-800 max-w-[41.25rem] border-none overflow-y-auto px-12">
        <BookDetailCard bookId={id} />

        <div className="flex w-full justify-between items-center mt-10 text-gray-200">
          <span>Avaliações</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-purple-100 font-semibold">Avaliar</button>
            </DialogTrigger>
            <LoginAlert />
          </Dialog>
        </div>

        <div className="flex flex-col w-full h-fit mt-4 gap-3">
          <RatingCard />
          <RatingCard />
          <RatingCard />
        </div>
      </SheetContent>
    </Sheet>
  )
}
