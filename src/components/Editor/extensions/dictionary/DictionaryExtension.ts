import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    dictionary: {
      openDictionary: () => ReturnType;
      closeDictionary: () => ReturnType;
    };
  }

  interface Storage {
    dictionary: {
      isOpen: boolean;
    };
  }
}

export const DictionaryExtension = Extension.create({
  name: "dictionary",

  addStorage() {
    return {
      isOpen: false,
    };
  },

  addCommands() {
    return {
      openDictionary:
        () =>
        ({ editor }) => {
          editor.storage.dictionary.isOpen = true;

          // 🔁 force update editor
          editor.view.dispatch(editor.state.tr);

          return true;
        },

      closeDictionary:
        () =>
        ({ editor }) => {
          editor.storage.dictionary.isOpen = false;

          // 🔁 force update editor
          editor.view.dispatch(editor.state.tr);

          return true;
        },
    };
  },
});
