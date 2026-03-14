import type { FC } from "react";
import type { FolderMenu } from "../../interfaces/folder/folder";
import { TextFolderItemBox } from "./TextFolderItemBox";

export const TextsFolderBox: FC<{ folder: FolderMenu }> = ({ folder }) => {
  if (folder.texts.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="italic font-montserrat font-light">
          Aucun fichier dans le dossier{" "}
          <span className="font-semibold capitalize">{folder.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-4 max-w-3xl w-full mx-auto">
      <TextFolderItemBox texts={folder.texts} folderSlug={folder.slug} />
    </div>
  );
};
