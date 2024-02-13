import { ApiClient } from "./ApiClient";

export const createQuestionForFormApiService = (
  userId,
  formId,
  question,
  token
) => {
  return ApiClient.post(
    `/question/${userId}/${formId}/create-question`,
    question,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Question successfully created", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Question Error--->>>", error);
      throw error;
    });
};

export const retrieveAllQuestionsForFormApiService = (userId,formId, token) => {
    return ApiClient.get(`/question/${userId}/${formId}/all-questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Question Data--->>>", response.data);
        return response.data; 
      })
      .catch((error) => {
        console.log("Get an Error Fetching Question Data--->>>", error);
        throw error;
      });
  };
