import { Editor } from "@tiptap/react";

export const FontFamilySelect = ({ editor }: { editor: Editor }) => {
  const handleChange = (value: string) => {
    if (value === "") {
      editor.chain().focus().unsetFontFamily().run();
      return;
    }

    editor.chain().focus().setFontFamily(value).run();
  };

  return (
    <select
      className="border rounded px-2 py-1 text-sm dark:bg-black"
      onChange={(e) => handleChange(e.target.value)}
      defaultValue=""
    >
      <option value="">Default</option>

      <optgroup label="Latin">
        <option value="Poppins">Poppins</option>
        <option value="Roboto">Roboto</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Merriweather">Merriweather</option>
      </optgroup>

      <optgroup label="Arabic">
        <option value="Scheherazade New">Scheherazade</option>
        <option value="Amiri Quran">Amiri Quran</option>
      </optgroup>
    </select>
  );
};
