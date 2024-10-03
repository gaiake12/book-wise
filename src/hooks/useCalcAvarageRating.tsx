import { Star } from 'phosphor-react'

interface Rating {
  rate: number
  description: string
}

export default function UseCalcAverageRating(ratings: Rating[]) {
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
