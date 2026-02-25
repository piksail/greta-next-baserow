import { useContext } from "react";
import { PreferredTagsContext } from "../context";
import { Button, Card, Chip, ListBox } from "@heroui/react";

export default function UserPreferredTags() {
  // If no context is used, use useState
  // const [preferredTags, setPreferredTags] = useState<string[]>([]);
  const { preferredTags, setPreferredTags } = useContext(PreferredTagsContext);

  const availableTags = ["Dev", "Infra", "UI", "UX"];

  function onTagClick(clickedTag: string) {
    if (preferredTags.includes(clickedTag)) {
      const tags = preferredTags.filter((tag) => tag !== clickedTag);
      setPreferredTags([...tags]);
    } else {
      setPreferredTags([...preferredTags, clickedTag]);
    }
  }

  return (
    <>
      <Card className="mb-8 rounded-sm">
        <Card.Title>Tags sélectionnés comme favoris</Card.Title>
        {preferredTags.length ? (
          <ul className="flex flex-wrap justify-center gap-2">
            {preferredTags.map((tag) => (
              <li key={tag}>
                <Chip color="accent" variant="soft">
                  {tag}
                </Chip>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun tag sélectionné.</p>
        )}
        <Card.Footer>
          <Button
            variant="danger"
            className="mx-auto mt-12"
            onClick={() => setPreferredTags([])}
          >
            Réinitialiser les tags
          </Button>
        </Card.Footer>
      </Card>
      <Card className="rounded-sm">
        <Card.Title>Tags disponibles</Card.Title>
        {/* <ListBox
          aria-label="Tags"
          selectionMode="multiple"
          selectedKeys={preferredTags}
          onSelectionChange={setPreferredTags}
        >
          {availableTags.map((tag) => (
            <ListBox.Item key={tag} id={tag} textValue={tag}>
              <div className="">{tag}</div>
              <button
                className={`rounded px-4 py-2 ${preferredTags.includes(tag) ? "border-[1px] border-white bg-indigo-500 text-white" : "bg-white text-indigo-900"}`}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox> */}
        <ul className="flex flex-wrap justify-center gap-2">
          {availableTags.map((tag) => (
            <li key={tag}>
              <Button
                variant={preferredTags.includes(tag) ? "primary" : "outline"}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
