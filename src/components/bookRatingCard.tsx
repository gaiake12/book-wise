import rocketIcon from '@/../../assets/github-icon.svg'
import oHobbit from '@/../../assets/o-hobbit.png'
import Image from 'next/image'

import { Star } from 'phosphor-react'

export default function BookRatingCard() {
  return (
    <div className="w-[42.5rem] h-fit p-6 bg-gray-700 rounded-md">
      <header className="flex gap-4 w-full h-12 justify-between">
        <div className="flex gap-4 items-start justify-center">
          <Image
            className="rounded-full"
            src={rocketIcon}
            width={40}
            height={40}
            alt="Profile Image"
          />

          <div>
            <span className="text-gray-100">Jaxson Dias</span>
            <p className="text-gray-400 text-sm">Hoje</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Star className="text-purple-100" />
          <Star className="text-purple-100" />
          <Star className="text-purple-100" />
          <Star className="text-purple-100" />
          <Star className="text-purple-100" />
        </div>
      </header>

      <div className="flex mt-6 gap-5">
        <Image
          src={oHobbit}
          width={108}
          height={152}
          className=""
          alt="book Image"
        />

        <div className="flex flex-col">
          <h1 className="text-gray-100 font-bold">O Hobbit</h1>
          <span className="text-gray-400 text-sm">J.R.R. Tolkien</span>

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
