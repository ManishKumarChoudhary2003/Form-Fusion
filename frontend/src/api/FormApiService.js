import { ApiClient } from "./ApiClient";

export const createFormForUserApiService = (userId, token, form) => {
  return ApiClient.post(`/form/${userId}/create-form`,form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log("Form Created--->>>", response.data);
    return response.data; 
  })
  .catch((error) => {
    console.log("Form Error--->>>", error);
    throw error;
  });
};


export const retrieveAllFormsForUserApiService = (userId,token) => {
    return ApiClient.get(`/form/${userId}/all-forms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Forms Data--->>>", response.data);
        return response.data; 
      })
      .catch((error) => {
        console.log("Get an Error Fetching Form Data--->>>", error);
        throw error;
      });
  };