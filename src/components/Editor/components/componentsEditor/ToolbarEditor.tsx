import { Editor } from "@tiptap/react";
import { AlignButtons } from "./AlignButtons";
import { ColorPicker } from "./ColorPicker";
import { FontSizeSelect } from "./FontSizeSelect";
import { TextFormatButtons } from "./TextFormatButtons";
import { FontFamilySelect } from "./FontFamilySelect";
import { DictionaryButton } from "./DictionaryButton";

type Props = {
  editor: Editor;
};

export const Toolbar = ({ editor }: Props) => {
  return (
    <div className="border px-2 py-2 overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max">
        <DictionaryButton editor={editor} />

        <TextFormatButtons editor={editor} />
        <FontSizeSelect editor={editor} />
        <FontFamilySelect editor={editor} />
        <ColorPicker editor={editor} />
        <AlignButtons editor={editor} />
      </div>
    </div>
  );
};
