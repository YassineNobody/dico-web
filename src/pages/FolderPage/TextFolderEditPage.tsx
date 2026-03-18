import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useFolders } from "../../hooks/useFolders";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  updateTextFolder,
  getTextsFolderById,
} from "../../services/textFolder";
import type { FolderMenu } from "../../interfaces/folder/folder";
import type { TextFolder } from "../../interfaces/folder/textFolder";
import { EditorTextFolder } from "../../components/Editor/EditorTextFolder";
import { MenuTextEditFolder } from "../../components/Editor/components/componentsMenu/MenuTextEditFolder";

 const TextFolderEditPage = () => {
  const { folderSlug, textSlug } = useParams();
  const { folders, isLoading } = useFolders();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const folder = folders.find((f) => f.slug === folderSlug);
  const textMeta = folder?.texts.find((t) => t.slug === textSlug);

  /*
  =========================
  GET TEXT CONTENT
  =========================
  */

  const { data: textContent, isLoading: isTextLoading } = useQuery({
    queryKey: ["text", folder?.id, textMeta?.slug],
    queryFn: () => getTextsFolderById(folder!.id, textMeta!.slug),
    enabled: !!folder && !!textMeta,
  });

  /*
  =========================
  UPDATE TITLE
  =========================
  */

  const mutation = useMutation({
    mutationFn: ({
      folderId,
      slug,
      newTitle,
    }: {
      folderId: number;
      slug: string;
      newTitle: string;
    }) => updateTextFolder(folderId, slug, { title: newTitle, slug }),

    onSuccess: (data: TextFolder) => {
      queryClient.setQueryData<FolderMenu[]>(["folders"], (old) => {
        if (!old) return old;

        return old.map((f) => {
          if (f.id !== data.folderId) return f;

          return {
            ...f,
            texts: f.texts.map((t) =>
              t.slug === textSlug
                ? { ...t, title: data.title, slug: data.slug }
                : t,
            ),
          };
        });
      });

      navigate(`/folders/${folderSlug}/${data.slug}`, { replace: true });
    },
  });

  /*
  =========================
  ROUTE GUARDS
  =========================
  */

  if (!folderSlug || !textSlug) {
    return <Navigate to="/folders" replace />;
  }

  if (isLoading) {
    return null;
  }

  if (!folder) {
    return <Navigate to="/folders" replace />;
  }

  if (!textMeta) {
    return null;
  }

  if (isTextLoading) {
    return null;
  }

  /*
  =========================
  EDIT TITLE
  =========================
  */

  const startEdit = () => {
    setTitle(textMeta.title);
    setIsEditing(true);
  };

  const saveTitle = async () => {
    const trimmed = title.trim();

    if (!trimmed || trimmed === textMeta.title) {
      setIsEditing(false);
      return;
    }

    await mutation.mutateAsync({
      folderId: folder.id,
      slug: textMeta.slug,
      newTitle: trimmed,
    });

    setIsEditing(false);
  };

  /*
  =========================
  UI
  =========================
  */

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <div className="px-4 py-2 flex items-center">
        <MenuTextEditFolder
          folder={folder}
          folderSlug={folderSlug}
          currentTextSlug={textMeta.slug}
        />
      </div>
      {/* HEADER */}
      <div className="px-4 py-3 border-b flex items-center gap-3">
        {isEditing ? (
          <input
            value={title}
            disabled={mutation.isPending}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
            className="text-xl font-montserrat border-b outline-none bg-transparent"
          />
        ) : (
          <>
            <span className="text-xl font-montserrat">{textMeta.title}</span>

            <Pencil
              size={16}
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={startEdit}
            />
          </>
        )}
      </div>

      {/* EDITOR */}
      <div className="flex-1 p-4 flex flex-col">
        <EditorTextFolder
          content={textContent?.content ?? ""}
          folder={folder}
          slugText={textMeta.slug}
        />
      </div>
    </div>
  );
};


export default TextFolderEditPage;