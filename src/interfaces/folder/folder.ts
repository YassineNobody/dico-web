export type Folder = {
  id: number;
  name: string;
  userId: number;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateFolder = {
  name: string;
};

export type UpdateFolder = CreateFolder & {
  slug: string;
};

export type FolderMenu = Folder & {
  texts: { title: string; slug: string }[];
};
