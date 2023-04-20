import instance from "../api/axios";
const fetchData = async (id) => {
  const { data } = await instance.get(`dashboard/getPlans/details/${id}`);

  return data;
};

export default fetchData;
