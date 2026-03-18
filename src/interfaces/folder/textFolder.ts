export type TextFolder = {
  id: number;
  folderId: number;
  title: string;
  content: string;
  slug: string;
  createAt: string;
  updatedAt: string;
};

export type CreateTextFolder = {
  title: string;
  content: string;
  folderId: number;
};

export type UpdateTextFolder = Partial<CreateTextFolder> & { slug: string };
