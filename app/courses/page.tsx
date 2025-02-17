"use client"

import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/contexts";

export default function Courses() {
  const currentUser = useContext(UserContext);
  const [courses, setCourses] = useState([])

  // TODO ici, reprendre le formulaire usequery

  return (
    <div className="">
      <header>
        <nav>

        </nav>
      </header>
      <main className="">
        <p>TODO</p>
      </main>
      <footer>
      </footer>
    </div>
  );
}
