import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../service/CourseService";


export default function EnrolledCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(
    () => {
      CourseService.getEnrolledCourses()
        .then((response) => {
          setCourses(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }, []);

  const dropCourse = (courseName) => {
    CourseService.dropCourse(courseName)
      .then((response) => {
        alert(`${courseName} dropped successfully`);
        window.location.reload();
      }).catch((error) => {
        alert(`${courseName} drop failed due to ${error}!`)
      })
  };

  return (
    <div>
      <CourseTable courses={courses}
        buttonText={"Drop"}
        handelButtonClick={dropCourse}
        buttonColor={"error"}
      />
    </div>
  )
}