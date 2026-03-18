import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import FlashCardItem from "./FlashCardItem";
import type { FlashCard } from "../../interfaces/dico/flashcard";

type Props = {
  cards: FlashCard[];
};

export default function FlashCardCarousel({ cards }: Props) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [flipped, setFlipped] = useState(false);

  const paginate = (dir: number) => {
    setFlipped(false);

    setIndex(([prev]) => {
      const next = prev + dir;
      if (next < 0 || next >= cards.length) return [prev, 0];
      return [next, dir];
    });
  };

  const reset = () => {
    setFlipped(false);
    setIndex([0, 0]);
  };

  const card = cards[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // LIMIT DOTS
  const maxDots = 7;
  const half = Math.floor(maxDots / 2);

  let start = Math.max(index - half, 0);
  let end = Math.min(start + maxDots, cards.length);

  if (end - start < maxDots) {
    start = Math.max(end - maxDots, 0);
  }

  const visibleDots = cards.slice(start, end);

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-6 w-full">
      {/* PROGRESS DOTS */}
      <div className="flex gap-2">
        {visibleDots.map((_, i) => {
          const realIndex = start + i;

          return (
            <div
              key={realIndex}
              className={`h-2 w-2 rounded-full transition-all ${
                realIndex === index
                  ? "bg-black dark:bg-white scale-125"
                  : "bg-gray-300 dark:bg-neutral-700"
              }`}
            />
          );
        })}
      </div>

      {/* CARD */}
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        {/* LEFT */}
        <button
          onClick={() => paginate(-1)}
          disabled={index === 0}
          className="absolute left-2 z-10 p-2 rounded-full border
          bg-white dark:bg-neutral-900
          border-gray-300 dark:border-neutral-700
          disabled:opacity-40"
        >
          <ArrowLeft size={18} />
        </button>

        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={card.uuid}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) paginate(1);
              if (info.offset.x > 100) paginate(-1);
            }}
            className="w-full flex justify-center"
          >
            <FlashCardItem
              front={card.sourceWord}
              back={card.translationWord}
              flipped={flipped}
              onFlip={() => setFlipped(!flipped)}
            />
          </motion.div>
        </AnimatePresence>

        {/* RIGHT */}
        {index < cards.length - 1 ? (
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 z-10 p-2 rounded-full border
            bg-white dark:bg-neutral-900
            border-gray-300 dark:border-neutral-700"
          >
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={reset}
            className="absolute right-2 z-10 p-2 rounded-full border
            bg-white dark:bg-neutral-900
            border-gray-300 dark:border-neutral-700
            flex items-center gap-1 text-sm px-3"
          >
            <RotateCcw size={16} />
            Recommencer
          </button>
        )}
      </div>

      {/* COUNTER */}
      <div className="text-sm text-gray-500">
        {index + 1} / {cards.length}
      </div>
    </div>
  );
}
