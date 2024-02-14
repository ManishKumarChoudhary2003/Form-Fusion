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

export const setFormLinkForFormApiService = (userId, formId, token) => {
  return ApiClient.post(`/form/${userId}/${formId}/set-link`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("Form link generated successfully:", response.data);
    return response.data;
  })
  .catch((error) => {
    console.log("Error generating form link:", error);
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

  export const retrieveFormForUserApiService = (userId, formId, token) => {
    return ApiClient.get(`/form/${userId}/${formId}/getForm`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get single Form Data--->>>", response.data);
        return response.data; 
      })
      .catch((error) => {
        console.log("Get an Error Fetching Form Data--->>>", error);
        throw error;
      });
  };


  export const updateFormForUserApiService = (userId,formId, token, form) => {
    return ApiClient.put(`/form/${userId}/${formId}/update-form`,form, {
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
