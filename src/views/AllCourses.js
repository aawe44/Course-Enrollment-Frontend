import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../service/CourseService";

export default function AllCourses() {

    const [courses, setCourses] = useState([]);

    useEffect(
        () => {
            CourseService.getAllCoureses()
                .then((response) => {
                    setCourses(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        }, []);

    const enrollCourse = (courseName) => {
        CourseService.enrollCourse(courseName)
            .then(response => {
                alert(`Congrats! ${courseName} enrollded successfully!`);
            }).catch(error => {
                alert(`Sorry, ${courseName} enrollment failed due to ${error}!`);
            });
    };

    return (
        <div>
            <CourseTable courses={courses}
                buttonText={"Enroll"}
                handelButtonClick={enrollCourse}
                buttonColor={"success"}
            />
        </div>
    )
}