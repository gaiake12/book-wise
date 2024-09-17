import Image from 'next/image'
import bookWiseLogo from '@/../../assets/book-wise-logo.png'
import sideBarBackground from '@/../../assets/side-bar-background.png'

import { ChartLineUp, Binoculars, SignIn, User } from 'phosphor-react'
import Link from 'next/link'

interface SideBarProps {
  logedIn: boolean
  activePage: string
}

export default function SideBar({ logedIn, activePage }: SideBarProps) {
  return (
    <div className="w-64 h-screen p-4">
      <div
        style={{ backgroundImage: `url(${sideBarBackground.src})` }}
        className="h-full w-56 to-gray-700 flex flex-col items-center p-8 rounded-md"
      >
        <Image
          src={bookWiseLogo}
          width={128}
          height={32}
          alt="book wise logo"
        />

        <div className="flex flex-col gap-6 text-gray-400 mt-20">
          <div className="flex">
            {activePage === 'home' && (
              <div className="w-1 h-7 bg-gradient-to-b from-gradient-from to-gradient-to rounded-lg ml-[-1rem] mr-3" />
            )}
            <Link href="/home" className="flex justify-start item-center gap-2">
              <ChartLineUp size={32} />
              Início
            </Link>
          </div>

          <div className="flex">
            {activePage === 'explore' && (
              <div className="w-1 h-7 bg-gradient-to-b from-gradient-from to-gradient-to rounded-lg ml-[-1rem] mr-3" />
            )}
            <Link
              href="home/explore"
              className="flex justify-start items-center gap-2"
            >
              <Binoculars size={32} />
              Explorar
            </Link>
          </div>

          <div className="flex">
            {activePage === 'profile' && (
              <div className="w-1 h-7 bg-gradient-to-b from-gradient-from to-gradient-to rounded-lg ml-[-1rem] mr-3" />
            )}
            <Link
              href="/home/profile"
              className="flex justify-start items-center gap-2"
            >
              <User size={32} />
              Perfil
            </Link>
          </div>
        </div>

        <button className="mt-auto">
          <span className="flex text-gray-100 gap-3 items-center">
            Fazer login <SignIn className="text-green-100" size={20} />
          </span>
        </button>
      </div>
    </div>
  )
}
