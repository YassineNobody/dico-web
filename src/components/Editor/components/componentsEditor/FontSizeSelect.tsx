import { Editor } from "@tiptap/react";

export const FontSizeSelect = ({ editor }: { editor: Editor }) => {
  return (
    <select
      className="border rounded px-2 py-1 text-sm dark:bg-black"
      onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
      defaultValue="16px"
    >
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="20px">20</option>
      <option value="24px">24</option>
      <option value="28px">28</option>
      <option value="32px">32</option>
      <option value="40px">40</option>
      <option value="48px">48</option>
    </select>
  );
};
