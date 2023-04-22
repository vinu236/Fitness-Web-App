import instance from "../api/axios";
const fetchData = async (id) => {
  const { data } = await instance.get(`dashboard/getPlans/details/${id}`);

  return data;
};

export const filterData = (searchText, allUser) => {
  const filterData = allUser.filter((user) => {
    console.log(searchText)
    console.log(user.userName)
    return user.userName.toLowerCase().includes(searchText.toLowerCase());
  });
  console.log(filterData)
  return filterData;
}



export default fetchData;
