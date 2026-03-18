import type {
  CreateTextFolder,
  TextFolder,
  UpdateTextFolder,
} from "../interfaces/folder/textFolder";
import { api, ContentType } from "./api";

export async function createTextFolder(newFolder: CreateTextFolder) {
  return await api.create<CreateTextFolder, TextFolder>(
    ContentType.TEXT_FOLDERS,
    newFolder,
    `/${newFolder.folderId}/texts`,
  );
}

export async function getTextsFolder(folderId: number) {
  return await api.get<TextFolder[]>(
    ContentType.TEXT_FOLDERS,
    `/${folderId}/texts`,
  );
}

export async function getTextsFolderById(folderId: number, slug: string) {
  return await api.get<TextFolder>(
    ContentType.TEXT_FOLDERS,
    `/${folderId}/texts/${slug}`,
  );
}

export async function updateTextFolder(
  folderId: number,
  slug: string,
  data: UpdateTextFolder,
) {
  return await api.update<UpdateTextFolder, TextFolder>(
    ContentType.TEXT_FOLDERS,
    data,
    `/${folderId}/texts/${slug}`,
  );
}
