import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import AllCourses from './views/AllCourses';
import EnrolledCourses from './views/EnrolledCourses';

function App() {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="enrolledCourses" element={<EnrolledCourses />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  )
}


export default App;
