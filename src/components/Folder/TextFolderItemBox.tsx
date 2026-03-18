import type { FC } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const TextFolderItemBox: FC<{
  folderSlug: string;
  texts: { title: string; slug: string }[];
}> = ({ texts, folderSlug }) => {
  return (
    <div className="flex flex-col gap-2">
      {texts.map((text) => (
        <Link
          key={text.slug}
          to={`/folders/${folderSlug}/${text.slug}`}
          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          <FileText size={18} className="opacity-70" />

          <span className="font-montserrat font-light">{text.title}</span>
        </Link>
      ))}
    </div>
  );
};
