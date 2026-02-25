"use client";

import { Button, Card, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

export default function ColorEditableCard() {
  const [color, setColor] = useState("red");

  return (
    <Card
      className="flex flex-col gap-7 rounded-sm p-8 text-xl text-white"
      style={{ backgroundColor: color }}
    >
      <TextField>
        <Label>Couleur</Label>
        <InputGroup>
          <InputGroup.Input
            variant="secondary"
            placeholder="#aadd55, rgb(255,128,0), ..."
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </InputGroup>
      </TextField>
      <Button
        variant="danger"
        className="mx-auto mt-12"
        onClick={() => setColor("")}
      >
        Réinitialiser la couleur
      </Button>
    </Card>
  );
}
