import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../service/CourseService";


export default function EnrolledCourses() {
    
  const [courses, setCourses] = useState([]);

  useEffect(
    () => {
        CourseService.getEnrolledCourses() // Promise
            .then((response) => {
                // success
                setCourses(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                // failed
                console.error(error);
            })
    }, []);
  
  const dropCourse = (courseName) => {
    CourseService.dropCourse(courseName)
    .then((response) =>{
      alert(`${courseName} dropped successfully`);
      window.location.reload();
    }).catch((error) => {
      alert(`${courseName} drop failed due to ${error}!`)
    })
  };
  
  return (
      <div>
        {/* <h1>This is Enrolled Courses.</h1> */}
        <CourseTable courses={courses}
                buttonText={"Drop"}
                handelButtonClick={dropCourse} 
                buttonColor ={"error"}
                />

      </div>
    )
  }