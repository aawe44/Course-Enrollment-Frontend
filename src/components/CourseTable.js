import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function CourseTable(props) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course Id</TableCell>
                        <TableCell align="right">courseName</TableCell>
                        <TableCell align="right">courseLocation</TableCell>
                        <TableCell align="right">courseContent</TableCell>
                        <TableCell align="right">teacherId</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.courses.map((row, index) => (

                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">{row.courseName}</TableCell>
                            <TableCell align="right">{row.courseLocation}</TableCell>
                            <TableCell align="right">{row.courseContent}</TableCell>
                            <TableCell align="right">{row.teacherID}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained"
                                    onClick={() => props.handelButtonClick(row.courseName)}
                                    color={props.buttonColor}>
                                    {props.buttonText}
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
