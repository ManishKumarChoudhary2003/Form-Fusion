import { ApiClient } from "./ApiClient";


export const createQuestionForFormApiService = (userId, formId, question, token) =>{
    return ApiClient.post(`/question/${userId}/${formId}/create-question`, question, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Question successfully created", response.data);
          return response.data; 
        })
        .catch((error) => {
          console.log("Question Error--->>>", error);
          throw error;
        });
}