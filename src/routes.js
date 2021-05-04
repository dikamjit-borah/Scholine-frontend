
//PRINCIPAL ROUTES
import Students from "./pages/principal/Students/Students";
import StudentDetail from "./pages/principal/SingleStudentDashboard/SingleStudentDashboard";
import Home from './pages/principal/Home/Home';
import AddStudent from './pages/principal/AddStudent/AddStudent'
import Feeslog from "./pages/principal/Feeslog/Feeslog";


//TEACHER ROUTES
import Attendance from "./pages/teacher/Attendance/Attendance"
import AddAttendance from "./pages/teacher/AddAttendance/AddAttendance";



const routes = [
    {
        name:"Home",
        path:"/Home",
        layout:"/main",
        page:Home
    },
    {
        name:"Students",
        path:"/students",
        layout:"/main",
        page:Students
    },
    {
        name:"Student by id",
        path:"/students/:id",
        layout:"/main",
        page:StudentDetail
    },
    {
        name:"Add Student",
        path:"/add student",
        layout:"/main",
        page:AddStudent
    },
    {
        name:"Student Fees",
        path:"/students/:id/fees",
        layout:"/main",
        page:Feeslog
    },


    {
        name:"Attendance",
        path:"/attendance/",
        layout:"/main",
        page:Attendance
    },

    {
        name:"Add Attendance",
        path:"/add attendance/",
        layout:"/main",
        page:AddAttendance
    }
]


export default routes;