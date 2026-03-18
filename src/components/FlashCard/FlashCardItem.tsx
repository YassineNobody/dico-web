type Props = {
  front: string
  back: string
  flipped: boolean
  onFlip: () => void
}

export default function FlashCardItem({ front, back, flipped, onFlip }: Props) {
  return (
    <div
      onClick={onFlip}
      className="w-full md:max-w-xs h-96 perspective cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full flex items-center justify-center border rounded-lg bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 backface-hidden">
          <span className="text-2xl font-semibold">{front}</span>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full flex items-center justify-center border rounded-lg bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 rotate-y-180 backface-hidden">
          <span className="text-4xl text-gray-700 dark:text-gray-200 ">{back}</span>
        </div>
      </div>
    </div>
  )
}