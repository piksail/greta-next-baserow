// https://tailwindcss.com/docs/dark-mode

"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function ExerciseThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  // TODO does not work since heroUIv3

  return (
    <Button
      data-theme={isDark ? "dark" : "light"}
      className={`${isDark ? "dark" : "light"} light:bg-indigo-200! mx-auto mt-12 p-12 text-center dark:bg-red-800`}
      onPress={() => setIsDark(!isDark)}
    >
      Basculer sur le thème {isDark ? "sombre" : "clair"}
    </Button>
  );
}
