import {
  type Folder,
  type CreateFolder,
  type FolderMenu,
  type UpdateFolder,
} from "../interfaces/folder/folder";
import { api, ContentType } from "./api";

export async function getFolders() {
  return await api.get<FolderMenu[]>(ContentType.FOLDERS);
}

export async function createFolder(folder: CreateFolder) {
  return await api.create<CreateFolder, Folder>(ContentType.FOLDERS, folder);
}

export async function updateFolder(updated: UpdateFolder) {
  return await api.update<UpdateFolder, Folder>(
    ContentType.FOLDERS,
    updated,
    `/${updated.slug}`,
  );
}

export async function deleteFolder(slug: string) {
  return await api.delete<{ message: string }>(ContentType.FOLDERS, `/${slug}`);
}
