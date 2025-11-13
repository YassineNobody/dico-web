import type { Learn } from "../../interfaces/learn/learn";
import { useState, useMemo, type FC } from "react";
import { SearchBoxLearn } from "./SearchBoxLearn";
import { ItemAllBoxLearn } from "./ItemAllBoxLearn";
export const AllBoxLearn: FC<{ learns: Learn[] }> = ({ learns }) => {
  const [query, setQuery] = useState("");

  // 🔍 Filtrage local par titre (insensible à la casse)
  const filteredLearns = useMemo(() => {
    const q = query.toLowerCase();
    return learns.filter((l) => l.title.toLowerCase().includes(q));
  }, [query, learns]);

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* 🔹 Barre de recherche */}
      <SearchBoxLearn onSearch={setQuery} />
      {filteredLearns.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-lg font-medium italic font-montserrat mt-10">
          <span>Aucun cours trouvé</span>
        </div>
      ) : (
        <div className="py-10 flex flex-col gap-4 w-full items-center">
          {filteredLearns.map((learn, idx) => (
            <ItemAllBoxLearn key={idx} learn={learn} />
          ))}
        </div>
      )}
    </div>
  );
};
