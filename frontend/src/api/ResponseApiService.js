import { ApiClient } from "./ApiClient";

export const responseForFormApiService = async (userId, formId) => {
    try {
      const response = await ApiClient.post(`/response/${userId}/${formId}/send-response`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };