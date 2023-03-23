import Banner from "../../components/User/Banner";
import Plans from "../../components/User/Plans";
import Footer from '../../components/User/Footer'
import Coursel from "../../components/Coursel"; 
import TimeHeading from "../../components/TimeHeading";
import Gallery from "../../components/Gallery";

const Home=()=>{
console.log("home")
    return(
        <main className="min-h-screen bg-black m-0">
           
           <Coursel/>
           <Plans/>
           <TimeHeading/>
           <Gallery/>
           <Footer/>
        </main>
    );
}
export default Home;