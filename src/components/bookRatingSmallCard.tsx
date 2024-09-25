import Image from 'next/image'
import oHobbit from '@/../../assets/o-hobbit.png'

import { Star } from 'phosphor-react'

export default function BookRatingSmallCard() {
  return (
    <div className="w-80 h-[8.125rem] bg-gray-700 rounded-md pt-4 pb-4 pl-5 pr-5 flex gap-5 m-auto">
      <Image src={oHobbit} width={64} height={94} alt="book cover" />
      <div className="flex flex-col">
        <span className="text-gray-100 font-bold">A revolução dos bichos</span>
        <span className="text-gray-400">George Orwell</span>

        <div className="flex justify-start items-center text-purple-100 gap-1 mt-auto">
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
        </div>
      </div>
    </div>
  )
}
