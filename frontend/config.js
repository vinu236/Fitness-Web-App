import { FaServer, FaUsers, FaUserSecret, FaBook } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {GiBookmarklet} from "react-icons/gi";




const Menu = [
  { title: " DashBoard", icons: <FaServer />, route: "" },
  { title: "Members", icons: <FaUsers />, route: "/users" },
  { title: "Trainers", icons: <FaUserSecret />, route: "/trainer" },
  { title: "Plans", icons: <FaBook />, route: "/plans" },
  {title:"Bookings",icons:<GiBookmarklet/>,route:"/bookings"},
  { title: "Logout", icons: <RiLogoutCircleRLine />, route: "/logout" },
];

export const tHeadData = [
  {
    traineeId: "Trainee id",
    traineeName: "Name",
    traineeJoinDate: "Date Of Join",
    traineeDueDate: "Due Date",
    traineePaymentStatus: "Payment Status",
  },
];

export const navbarMenu =[
  {navTitle: "Home",to:"/"},
  {navTitle: "Plans",to:"/Plans"},
  {navTitle: "Blog",to:"/Blog"},
  {navTitle: "About",to:"/About"},
];
export const URL="http://localhost:3000";


export const profileHeading=[
  {title:"Details",to:"/details"},
  {title:"Password", to:"/profile"},
  {title:"Bmi",to:"/Bmi"},
  {title:"Plan",to:"/plan"}
]

  export const traineeAuth={
    headers:{
      Authorization:`Bearer ${localStorage.getItem("traineeToken")}`
    }
  }

// export const Quotes=[
//   "Time and health are two precious assets that we don't recognize and appreciate until they have been depleted. - Denis Waitley",
//   "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to. - Lao Tzu",
//   "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity. - John F. Kennedy"
  
// ]
export default Menu;
