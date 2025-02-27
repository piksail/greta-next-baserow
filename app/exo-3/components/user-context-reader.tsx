import { useContext } from "react";
import { PreferredTagsContext } from "../context";

export default function UserContextReader() {
  const { preferredTags } = useContext(PreferredTagsContext);

  return (
    <div className="my-12 text-2xl">
      (composant utilisant le contexte) Les tags préférés sont{" "}
      {preferredTags.join("")}
    </div>
  );
}
