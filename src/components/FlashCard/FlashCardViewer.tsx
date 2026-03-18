import { ArrowLeft } from "lucide-react";
import { useFlashcards } from "../../hooks/useFlashcards";
import FlashCardCarousel from "./FlashCardCarousel";

type Props = {
  section: number;
  themes: string[];
  limit: number;
  onBack: () => void;
};

const FlashCardViewer = ({ section, themes, limit, onBack }: Props) => {
  const { data, isLoading } = useFlashcards(limit, themes, section);

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (!data) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-6 flex-1">
      <div className="w-full px-6">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer flex flex-row items-center gap-1 "
        >
          <ArrowLeft size={18} />
          <span>retour</span>
        </button>
      </div>

      <FlashCardCarousel cards={data.cards} />
    </div>
  );
};

export default FlashCardViewer;
