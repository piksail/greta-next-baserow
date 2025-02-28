import { usePreferredTagsStore } from "../page";

export default function UserPreferredTags() {
  // If no context is used, use useState
  // const [preferredTags, setPreferredTags] = useState<string[]>([]);
  const { preferredTags, updateTags } = usePreferredTagsStore();

  const availableTags = ["Dev", "Infra", "UI", "UX"];

  function onTagClick(clickedTag: string) {
    if (preferredTags.includes(clickedTag)) {
      const tags = preferredTags.filter((tag) => tag !== clickedTag);
      updateTags([...tags]);
    } else {
      updateTags([...preferredTags, clickedTag]);
    }
  }

  return (
    <div className="flex flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white">
      <h2 className="mb-3 text-3xl">Tags sélectionnés comme favoris</h2>
      {preferredTags.length ? (
        <ul className="flex flex-wrap justify-center gap-2">
          {preferredTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun tag sélectionné.</p>
      )}
      <button
        className="mx-auto mt-12 inline-block w-fit cursor-pointer rounded bg-white px-4 py-2 text-2xl font-bold text-red-700"
        onClick={() => updateTags([])}
      >
        Réinitialiser les tags
      </button>
      <h2 className="mb-3 text-3xl">Tags disponibles</h2>
      <ul className="flex flex-wrap justify-center gap-2">
        {availableTags.map((tag) => (
          <li key={tag}>
            <button
              className={`rounded px-4 py-2 ${preferredTags.includes(tag) ? "border-[1px] border-white bg-indigo-500 text-white" : "bg-white text-indigo-900"}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
