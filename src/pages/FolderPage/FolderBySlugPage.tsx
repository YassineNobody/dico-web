import { Navigate, useParams } from "react-router-dom";
import { useFolders } from "../../hooks/useFolders";
import { NavbarFolder } from "../../components/Folder/NavbarFolder";
import { TextsFolderBox } from "../../components/Folder/TextsFolderBox";

export default function FolderBySlugPage ()  {
  const { slug } = useParams();
  const { folders, isLoading } = useFolders();

  if (!slug) {
    return <Navigate to="/folders" replace />;
  }

  if (isLoading) {
    return null;
  }

  const existsFolder = folders.find((p) => p.slug === slug);

  // ⚠️ ne plus rediriger immédiatement
  if (!existsFolder) {
    return null;
  }

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-col justify-center items-center px-2 py-3">
        <div className="md:max-w-3xl w-full">
          <NavbarFolder folder={existsFolder} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <TextsFolderBox folder={existsFolder} />
      </div>
    </div>
  );
};
