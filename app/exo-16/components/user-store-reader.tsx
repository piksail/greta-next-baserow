import { usePreferredTagsStore } from "../page";

export default function UserStoreReader() {
  const { preferredTags } = usePreferredTagsStore();

  return (
    <div className="my-12 text-2xl">
      (composant utilisant le store) Les tags préférés sont{" "}
      {preferredTags.join("")}
    </div>
  );
}
