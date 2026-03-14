import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Folder,
  FolderMenu,
  UpdateFolder,
} from "../../../interfaces/folder/folder";
import { updateFolder } from "../../../services/folders";
import SpinnerLoader from "../../Spinner/Loader";
import { useNavigate } from "react-router-dom";

type Props = {
  folder: Folder;
  onClose: () => void;
};

export const ModalUpdateFolderForm = ({ folder, onClose }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFolder>({
    defaultValues: {
      name: folder.name,
      slug: folder.slug,
    },
  });
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: updateFolder,
    retry: false,
    onSuccess: (data: Folder) => {
      queryClient.setQueryData<FolderMenu[]>(["folders"], (old) => {
        if (!old) return old;

        return old.map((f) =>
          f.id === data.id
            ? {
                ...f,
                name: data.name,
                slug: data.slug,
              }
            : f,
        );
      });

      onClose();
      navigate(`/folders/${data.slug}`, { replace: true });
    },
  });

  const onSubmit = async (data: UpdateFolder) => {
    await mutateAsync({
      ...data,
      slug: folder.slug,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        {...register("name", { required: "Le nom est obligatoire" })}
        className="border p-2 rounded"
      />

      {errors.name && (
        <span className="text-red-500 text-sm">{errors.name.message}</span>
      )}

      {isError && (
        <span className="text-red-500 text-sm">Une erreur est survenue</span>
      )}

      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
        >
          {isPending ? (
            <>
              <span>Modification...</span>
              <SpinnerLoader size={16} />
            </>
          ) : (
            "Modifier"
          )}
        </button>
      </div>
    </form>
  );
};
