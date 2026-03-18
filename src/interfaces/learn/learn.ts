export interface Learn {
  id: number;
  title: string;
  slug: string;
  urlPdf: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;

  category?: {
    id: number;
    slug: string;
    name: string;
  };
}
