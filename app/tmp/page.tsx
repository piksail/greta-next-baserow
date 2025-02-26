"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Tmp() {
  const queryClient = useQueryClient();
  // const url = "https://base.piksail.com/api/database/rows/table/727/";
  // const response = await fetch(url, {
  // headers: {
  //   Authorization: `${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
  // },
  // });
  // const courses = await response.json();

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["getCourses"],
    queryFn: () =>
      fetch("https://base.piksail.com/api/database/rows/table/727/", {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
        },
      }).then((res) => res.json()),
  });
  const courses = data?.results;

  // TODO auth -> POST https://base.piksail.com/api/user/token-auth/
  const loginMutation = useMutation({
    mutationFn: () =>
      fetch(`https://base.piksail.com/api/user/token-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "foo",
          password: "bar",
        }),
      }),
    onSuccess: () => {},
  });

  const deleteCourseMutation = useMutation({
    mutationFn: () =>
      fetch(
        `https://base.piksail.com/api/database/rows/table/727/${selectedCourseId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },
  });

  console.log(courses);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <p>{data.count} results</p>
      <ol>
        {courses.map((course) => (
          <li key={course.id}>
            <dl className="">
              <div className="flex gap-2">
                <dt>ID</dt>
                <dd>{course.id}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Name</dt>
                <dd>{course.name}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <div>
        <input
          className="border-grey border-2"
          placeholder="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="border-grey border-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={() => loginMutation.mutate()}>Log in</button>
      </div>
      <input
        className="border-grey border-2"
        value={selectedCourseId}
        onChange={(event) => setSelectedCourseId(event.target.value)}
      />
      <button
        className="bg-red-500 text-white"
        onClick={() => deleteCourseMutation.mutate()}
      >
        Delete
      </button>
    </div>
  );
}
