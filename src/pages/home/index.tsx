import Image from 'next/image'
import bookWiseLogo from '@/../../assets/book-wise-logo.png'
import { ChartLineUp, Binoculars, SignIn } from 'phosphor-react'

export default function Home() {
  return (
    <div className="w-scren h-screen p-4">
      <div className="h-full w-56  from-gray-700 to-gradient-to rounded-md bg-gradient-to-t flex flex-col items-center p-8">
        <Image
          src={bookWiseLogo}
          width={128}
          height={32}
          alt="book wise logo"
        />

        <div className="flex flex-col gap-6 text-gray-400 mt-20">
          <button>
            <span className="flex justify-start item-center gap-2">
              <ChartLineUp size={32} />
              Início
            </span>
          </button>

          <button>
            <span className="flex justify-start items-center gap-2">
              <Binoculars size={32} />
              Explorar
            </span>
          </button>
        </div>

        <button className="mt-auto">
          <span className="flex text-gray-100 gap-3 items-center">
            Fazer login <SignIn className="text-green-100" size={20} />
          </span>
        </button>
      </div>
      <div className="">col2</div>
    </div>
  )
}
