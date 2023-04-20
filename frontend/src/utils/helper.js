import instance from "../api/axios";
const fetchData = async (id) => {
  const { data } = await instance.get(`dashboard/getPlans/details/${id}`);

  return data;
};

export const filterData=(searchText,allUser)=>{

  const filterData=allUser.filter((user)=>{
    
  })
}


export default fetchData;
