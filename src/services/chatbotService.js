import { ENDPOINTS } from "../configs/api";
import { API } from "../configs/axios";

export const chatbotService = {
    // Send a message to the chatbot
    sendQuestion: async (questionData) => {
        const response = await API.post(ENDPOINTS.NEWS.SEND_QUESTION, questionData);
        return response.data;
    },
};