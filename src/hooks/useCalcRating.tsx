import { Star } from 'phosphor-react'

export default function UseCalcRating(rate: number) {
  const stars = []

  for (let i = 1; i < 6; i++) {
    if (i <= rate) {
      stars.push(<Star key={i} size={16} weight="fill" />)
    } else {
      stars.push(<Star key={i} size={16} />)
    }
  }

  return stars
}
