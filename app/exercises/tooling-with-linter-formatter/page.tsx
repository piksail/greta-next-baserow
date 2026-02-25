import { Card } from "@heroui/react";

export default function ExerciseToolingWithLinterFormatter() {
  return (
    <Card className="rounded-sm text-left">
      <Card.Header>
        <Card.Description>.vscode/settings.json</Card.Description>
      </Card.Header>
      <code className="">
        &quot;editor.formatOnSave&quot;: true,
        <br />
        &quot;editor.defaultFormatter&quot;: &quot;esbenp.prettier-vscode&quot;
      </code>
    </Card>
  );
}
