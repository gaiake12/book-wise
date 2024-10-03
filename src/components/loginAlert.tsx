import Image from 'next/image'
import googleIcon from '@/../../assets/google-icon.svg'
import githubIcon from '@/../../assets/github-icon.svg'
import { DialogHeader, DialogContent, DialogDescription } from './ui/dialog'
import { signIn } from 'next-auth/react'

export function LoginAlert() {
  return (
    <DialogContent className="bg-gray-700 w-[32.5rem] h-[21.06rem] py-14 px-16">
      <DialogHeader className="outline-none">
        <DialogDescription className="flex w-full items-center justify-center font-semibold text-gray-200">
          Faça login para deixar sua avaliação
        </DialogDescription>
      </DialogHeader>
      <div>
        <button
          onClick={() => signIn('google')}
          className="flex justify-start items-center w-full h-18 bg-gray-600 px-6 py-5 gap-5 rounded-md text-gray-100 font-bold mt-5 hover:bg-gray-500"
        >
          <Image src={googleIcon} width={32} height={32} alt="google icon" />
          Entrar com Google
        </button>

        <button
          onClick={() => signIn('github')}
          className="flex justify-start items-center w-full h-18 bg-gray-600 px-6 py-5 gap-5 rounded-md text-gray-100 font-bold mt-5 hover:bg-gray-500"
        >
          <Image src={githubIcon} width={32} height={32} alt="gitHub icon" />
          Entrar com GitHub
        </button>
      </div>
    </DialogContent>
  )
}
