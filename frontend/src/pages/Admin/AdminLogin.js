import TrainerImg from "../../assets/img/offer.png";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
const AdminLogin = () => {
  const initialValues={email:"",password:""}
  const[formValues,setFormValues]=useState(initialValues);
  const [formError,setFormError]=useState({});
  const navigate=useNavigate()

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormValues({...formValues,[name]:value})

  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    setFormError(validate(formValues));
    
    postLogin();
    

  }

  //!making Api Call
  async function postLogin(){

    if(Object.keys(formError).length===0){
      const {data,status}=await instance.post("/admin/login",formValues);
      
      const {success}=data
      if(status===200 && success===true){
        navigate('/dashboard')
      }
      
    }
  }

  //!Validating
  const validate=(values)=>{
    error={}
  
    if(!values.email){
      return error.email="Email field Cannot be blank"
    }

    if(!values.password){
      return error.password="Password field Cannot be blank"
    }

    return error;
  }

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center ">
      <div className="flex justify-center items-center gap-6 flex-wrap">
        <div className="w-1/2">
          <img src={TrainerImg} alt="" className="rounded-3xl" />
        </div>

        <div className="p-11 border">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="text-white text-center text-3xl">Admin Login</p>
            </div>
            <div className="p-4">
              <label className="text-white block text-2xl mb-3">Email</label>
              {formError.email && <p className="text-red-500">{formValues.email}</p>}
              <input type="text" className="p-2" 
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              />
            </div>
            <div className="p-4">
              <p className="text-white block text-2xl mb-3"
              >Password</p>
              {formError.password && <p className="text-red-500">{formError.password}</p>}
              <input type="password" className="p-2" 
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              />
            </div>
            <button className="bg-custom-gym">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
};
export default AdminLogin;


