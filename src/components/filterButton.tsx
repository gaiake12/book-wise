interface FilterButtonProps {
  displayText: string
  searchCategory: (searchedText: string) => void
}

export default function FilterButton({
  displayText,
  searchCategory,
}: FilterButtonProps) {
  return (
    <button
      onClick={() => searchCategory(displayText)}
      className="bg-transparent w-fit h-8 rounded-2xl px-4 py-1 flex items-center justify-center border-purple-100 border-2 text-purple-100 hover:text-gray-300 hover:bg-purple-200"
    >
      {displayText}
    </button>
  )
}
