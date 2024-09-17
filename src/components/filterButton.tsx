interface FilterButtonProps {
  displayText: string
}

export default function FilterButton({ displayText }: FilterButtonProps) {
  return (
    <button className="bg-transparent w-fit h-8 rounded-2xl px-4 py-1 flex items-center justify-center border-purple-100 border-2 text-purple-100">
      {displayText}
    </button>
  )
}
