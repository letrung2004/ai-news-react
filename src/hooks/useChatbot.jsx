import { useState } from "react";
import { chatbotService } from "../services/chatbotService";

const useChatbot = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    const sendQuestion = async (questionData) => {
        setLoading(true);
        try {
            const response = await chatbotService.sendQuestion(questionData);
            setConversation((prev) => [...prev, { question: questionData.question, answer: response.result.answer }]);
        } catch (error) {
            const errorMessage = error.message || 'Có lỗi xảy ra';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        conversation,
        sendQuestion,
    };
};
export default useChatbot;
