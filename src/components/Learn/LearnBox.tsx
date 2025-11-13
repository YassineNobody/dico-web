import { ArrowLeft } from "lucide-react";
import type { Learn } from "../../interfaces/learn/learn";
import type { LearnCategories } from "../../interfaces/learnCategories/learnCategories";
import { ItemLearnBox } from "./ItemLearnBox";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { SearchBoxLearn } from "./SearchBoxLearn";

export const LearnBox = ({
  cat,
  learns,
}: {
  cat: LearnCategories;
  learns: Learn[];
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 🔍 Filtrage local par titre (insensible à la casse)
  const filteredLearns = useMemo(() => {
    const q = query.toLowerCase();
    return learns.filter((l) => l.title.toLowerCase().includes(q));
  }, [query, learns]);

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full py-3 relative">
        <button
          className="flex font-montserrat tracking-wider text-sm flex-row items-center gap-2 absolute z-20 top-1/2 -translate-y-1/2 left-10 transition-all duration-1000 hover:underline hover:underline-offset-4 cursor-pointer"
          onClick={() => navigate("/learn-arabic?mode=box")}
        >
          <ArrowLeft size={18} />
          <span>Autres catégories</span>
        </button>
        <h1 className="text-center text-xl md:text-3xl font-medium text-emerald-800 tracking-wide">
          {cat.name}
        </h1>
      </div>

      {/* 🔹 Barre de recherche */}
      <SearchBoxLearn onSearch={setQuery} />

      {filteredLearns.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-lg font-medium italic font-montserrat mt-10">
          <span>Aucun cours trouvé</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1 lg:grid-cols-3 py-10">
          {filteredLearns.map((learn, idx) => (
            <ItemLearnBox learn={learn} key={idx} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
};
