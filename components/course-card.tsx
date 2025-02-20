import { useContext } from "react";
import { UserContext } from "@/app/contexts";
import { BaserowCourse } from "@/types";
import { useRouter } from "next/navigation";

export default function CourseCard({
  course,
}: Readonly<{
  course: BaserowCourse;
}>) {
  const router = useRouter();
  const { setCurrentRegistration } = useContext(UserContext);

  function registerToCourse(courseId: BaserowCourse["id"]) {
    setCurrentRegistration(courseId);
    router.push("/course-validation");
  }

  return (
    <div
      className={`flex flex-col border-[1px] border-transparent ${course.category.value === "design" ? "bg-fir-300 text-fir-950" : "bg-clay-300"} rounded p-4`}
    >
      <h4 className="text-4xl">{course.name}</h4>
      <time>{course.start_date}</time>
      <button
        className={`cursor-pointer bg-white ${course.category.value === "design" ? "text-fir-800" : "text-clay-800"} mt-12 inline-flex justify-center rounded-xl px-3 py-2 font-semibold`}
        onClick={() => registerToCourse(course.id)}
      >
        Register
      </button>
    </div>
  );
}
