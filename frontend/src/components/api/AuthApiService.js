import { ApiClient } from "./ApiClient"

// export const userRegisterApiService = (user) =>{
//     ApiClient.post("/auth/register",user)
// }

export const userRegisterApiService = (user) => {
    return ApiClient.post("/auth/register", user);
}

export const userLoginApiService = async (username, password) => {
    try {
      const response = await ApiClient.post(`auth/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };