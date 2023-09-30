import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../service/CourseService";

export default function AllCourses() {

    const [courses, setCourses] = useState([]);

    useEffect(
        () => {
            CourseService.getAllCoureses()
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


    const enrollCourse = (courseName) => {
        CourseService.enrollCourse(courseName) //promise
            .then(response => {
                alert(`Congrats! ${courseName} enrollded successfully!`);
            }).catch(error => {
                alert(`Sorry, ${courseName} enrollment failed due to ${error}!`);
            });
    };



    return (
        <div>
            {/* <h1>This is All Courses.</h1> */}
            <CourseTable courses={courses}
                buttonText={"Enroll"}
                handelButtonClick={enrollCourse} 
                buttonColor ={"success"}
                />
        </div>
    )
}