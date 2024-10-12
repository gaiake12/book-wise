import Image from 'next/image'
import bookWisePresentation from '../../../assets/book-wise-presentation.png'
import googleIcon from '@/../../assets/google-icon.svg'
import githubIcon from '@/../../assets/github-icon.svg'
import rocketIcon from '@/../../assets/rocket-icon.svg'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  async function handleLogIn(type: string) {
    await signIn(type)
  }

  return (
    <div className="flex justify-center items-center p-4 overflow-hidden ">
      <div>
        <Image
          src={bookWisePresentation}
          width={598}
          height={912}
          alt="book wise presentation"
        />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className=" w-80 h-80">
          <h2 className="text-2xl text-gray-100 font-semibold">Boas vindas!</h2>
          <p className="text-gray-300 mb-10">
            Faça seu login ou acesse como visitante
          </p>

          <button
            onClick={() => handleLogIn('google')}
            className="flex justify-start items-center w-full h-18 bg-gray-600 px-6 py-5 gap-5 rounded-md text-gray-100 font-bold mt-5 hover:bg-gray-500"
          >
            <Image src={googleIcon} width={32} height={32} alt="google icon" />
            Entrar com Google
          </button>

          <button
            onClick={() => handleLogIn('gitHub')}
            className="flex justify-start items-center w-full h-18 bg-gray-600 px-6 py-5 gap-5 rounded-md text-gray-100 font-bold mt-5 hover:bg-gray-500"
          >
            <Image src={githubIcon} width={32} height={32} alt="gitHub icon" />
            Entrar com GitHub
          </button>

          <button
            onClick={() => router.push('/home')}
            className="flex justify-start items-center w-full h-18 bg-gray-600 px-6 py-5 gap-5 rounded-md text-gray-100 font-bold mt-5 hover:bg-gray-500"
          >
            <Image src={rocketIcon} width={32} height={32} alt="rocket icon" />
            Acessar como visitante
          </button>
        </div>
      </div>
    </div>
  )
}
