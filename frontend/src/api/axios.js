import axios from "axios";
const instance=axios.create({
  
    baseURL: 'https://api.getfitgo.online',
});
//  https://api.getfitgo.online
export default instance;