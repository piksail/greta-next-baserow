"use client";

import { useState } from "react";

export default function ColorEditableCard() {
  const [color, setColor] = useState("");

  return (
    <div
      className="flex flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white"
      style={{ backgroundColor: color }}
    >
      <label className="flex flex-col gap-1 text-left shadow-black drop-shadow">
        <span className="text-xl">Couleur</span>
        <input
          className="border-b-2 border-white"
          placeholder="#aadd55, rgb(255,128,0), ..."
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </label>
      <button
        className="mx-auto mt-12 inline-block w-fit cursor-pointer rounded bg-white px-4 py-2 text-2xl font-bold text-red-700"
        onClick={() => setColor("")}
      >
        Réinitialiser la couleur
      </button>
    </div>
  );
}
