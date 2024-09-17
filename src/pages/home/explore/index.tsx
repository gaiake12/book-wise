import BookRatingSmallCard from '@/components/bookRatingSmallCard'
import FilterButton from '@/components/filterButton'
import SideBar from '@/components/sideBar'
import { Binoculars, MagnifyingGlass } from 'phosphor-react'

export default function Explore() {
  return (
    <div className="flex">
      <SideBar activePage="explore" logedIn={false} />
      <div className="mt-16 px-12">
        <div className="flex justify-between w-full">
          <h1 className="text-gray-100 text-2xl flex gap-2 items-center mb-10">
            <Binoculars size={32} className="text-green-100" />
            Explorar
          </h1>

          <div className="w-[27rem] flex items-center justify-between h-12 border-gray-500 bg-gray-800 border-2 mb-4 p-3 rounded-md">
            <input
              type="Text"
              placeholder="Buscar livro avaliado"
              className="text-gray-100  flex w-full bg-gray-800 h-full placeholder:text-gray-400 outline-none"
            />

            <MagnifyingGlass size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex my-10 gap-3">
          <FilterButton displayText="Tudo" />
          <FilterButton displayText="Computação" />
          <FilterButton displayText="Educação" />
          <FilterButton displayText="Fantasia" />
          <FilterButton displayText="Ficção científica" />
          <FilterButton displayText="Horror" />
          <FilterButton displayText="HQs" />
          <FilterButton displayText="Suspense" />
        </div>

        <div className="grid w-[62.25rem] grid-cols-3 gap-5 border-collapse">
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
          <BookRatingSmallCard
            cardHeight={11.5}
            imageHeight={108}
            imageWidth={152}
          />
        </div>
      </div>
    </div>
  )
}
