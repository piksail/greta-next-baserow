import { useContext } from "react";
import { PreferredTagsContext } from "../context";
import { Description } from "@heroui/react";

export default function UserContextReader() {
  const { preferredTags } = useContext(PreferredTagsContext);

  return (
    <div className="my-12">
      <Description>
        (composant utilisant le contexte) Les tags préférés sont :
      </Description>
      <p>{preferredTags.join(", ")}</p>
    </div>
  );
}
