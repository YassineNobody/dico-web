import type { FC } from "react";
import type { Learn } from "../../interfaces/learn/learn";
import type { LearnCategories } from "../../interfaces/learnCategories/learnCategories";
import { CardBoxLearn } from "../Pdf/CardPdfLearn";

export const ItemLearnBox: FC<{ learn: Learn; cat: LearnCategories }> = ({
  learn,
  cat,
}) => {
  return <CardBoxLearn doc={learn} cat={cat} />;
};
