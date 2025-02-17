"use client"

import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/contexts";

export default function Home() {
  const currentUser = useContext(UserContext);
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://base.piksail.com/api/database/rows/table/727/?user_field_names=true', {
          headers: {
            "Authorization": `Token ${process.env.NEXT_PUBLIC_PUBLIC_API_TOKEN}`
          }
        })
        const data = await response.json()
        setCourses(data.results)
        console.log("yoyo", data)
      } catch (e) {
        console.error("ERROR")
      }
    }
    fetchData();
  }, [])

  return (
    <div className="">
      <header>
        <nav>

        </nav>
      </header>
      <main className="">
        <p>TODO</p>
        <p>{courses.length} courses</p>
        <ul>
          {courses.filter((course) => course.category.value === currentUser.preferredCategory).map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      </main>
      <footer>
      </footer>
    </div>
  );
}
