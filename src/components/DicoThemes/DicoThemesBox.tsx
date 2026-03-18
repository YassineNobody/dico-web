export const DicoThemesBox = ({
  themes,
  onChange,
  onSelected,
}: {
  themes: string[];
  onChange: (theme: string) => void;
  onSelected: string | null;
}) => {
  return (
    <select
      value={onSelected ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="
        px-3 py-2 rounded-lg border
        border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        focus:ring-2 focus:ring-blue-500
        focus:border-blue-500
        outline-none
        transition
      "
    >
      <option value="">-- sélectionner un thème --</option>

      {themes.map((theme, idx) => (
        <option key={idx} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};
