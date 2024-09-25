import Image from 'next/image'
import { Star } from 'phosphor-react'
import profileImage from '@/../assets/profile-image.jpg'

export function RatingCard() {
  return (
    <div className="w-full h-fit min-h-36 p-6 bg-gray-700 rounded-md">
      <header className="flex gap-4 w-full h-12 justify-between">
        <div className="flex gap-4 items-start justify-center">
          <Image
            className="rounded-full"
            src={profileImage}
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
          <Star className="text-purple-100" weight="fill" />
          <Star className="text-purple-100" weight="fill" />
          <Star className="text-purple-100" weight="fill" />
          <Star className="text-purple-100" weight="fill" />
          <Star className="text-purple-100" />
        </div>
      </header>

      <p className="mt-5 text-sm text-gray-300">
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </p>
    </div>
  )
}
