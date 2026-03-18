import { Earth } from "lucide-react";
import { useMenuLearn } from "../../hooks/useMenuLearnCategories";
import { ItemLearnCategoy } from "../../components/LearnCategories/ItemLearnCategory";

 const LearnCategoriesPage = () => {
  const { menu } = useMenuLearn();

  return (
    <div className="flex-1 text-black dark:text-white bg-white dark:bg-blue-950 flex flex-col justify-center items-center px-2">
      <div className="flex flex-col gap-5 md:max-w-4xl w-full">
        <div className="py-4 flex flex-row gap-2 items-center justify-center text-xl md:text-3xl font-montserrat tracking-wide font-medium">
          <h1 className="text-green-900 dark:text-white">Toutes les catégories</h1>
          <Earth className="size-6 md:size-9 text-green-900 dark:text-white" />
        </div>
        <div className="flex flex-col gap-3">
          {menu.map((cat) => (
            <ItemLearnCategoy item={cat} key={cat.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LearnCategoriesPage;