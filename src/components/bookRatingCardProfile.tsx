import oHobbit from '@/../../assets/o-hobbit.png'
import Image from 'next/image'

import { Star } from 'phosphor-react'

export default function BookRatingCardProfile() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400">Há 2 dias</span>
      <div className="w-[42.5rem] h-fit p-6 bg-gray-700 rounded-md">
        <div className="flex flex-col gap-5 p-4">
          <div className="flex gap-6">
            <Image src={oHobbit} width={98} height={134} alt="book Image" />

            <div className="flex flex-col">
              <h1 className="text-gray-100 font-bold">O Hobbit</h1>
              <span className="text-gray-400 text-sm">J.R.R. Tolkien</span>

              <div className="flex gap-1 mt-auto">
                <Star className="text-purple-100" weight="fill" />
                <Star className="text-purple-100" />
                <Star className="text-purple-100" />
                <Star className="text-purple-100" />
                <Star className="text-purple-100" />
              </div>
            </div>
          </div>
          <p className="mt-5 text-gray-300">
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et
            aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
            a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh
          </p>
        </div>
      </div>
    </div>
  )
}
