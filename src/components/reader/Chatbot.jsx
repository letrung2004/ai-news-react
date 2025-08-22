import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import useChatbot from '../../hooks/useChatbot';

const Chatbot = ({ articleId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);


    const { error, loading, conversation, sendQuestion } = useChatbot();

    const [initialMessage] = useState({
        id: 1,
        text: "Xin chào! Tôi là trợ lý MAGNEWS. Tôi có thể giúp bạn tìm hiểu thông tin về bài báo này. Hãy hỏi tôi bất cứ điều gì!",
        isBot: true,
        timestamp: new Date()
    });

    const messages = [
        initialMessage,
        ...conversation.flatMap((conv, index) => [
            {
                id: `user-${index}`,
                text: conv.question,
                isBot: false,
                timestamp: new Date()
            },
            {
                id: `bot-${index}`,
                text: conv.answer,
                isBot: true,
                timestamp: new Date()
            }
        ])
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || loading) return;

        const question = inputValue.trim();
        setInputValue('');

        await sendQuestion({
            articleId: articleId,
            question: question
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !loading) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="mb-4 bg-white rounded-xl shadow-xl border border-gray-200 w-72 h-105 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot size={14} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Trợ lý báo MAGNEWS</h3>
                                <p className="text-xs opacity-90">Hỗ trợ 24/7</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-green-100 text-green-600'
                                    }`}>
                                    {message.isBot ? <Bot size={10} /> : <User size={10} />}
                                </div>
                                <div className={`max-w-[75%] ${message.isBot ? '' : 'text-right'}`}>
                                    <div className={`p-2.5 rounded-xl text-xs leading-relaxed ${message.isBot
                                        ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                        : 'bg-green-500 text-white rounded-tr-sm'
                                        }`}>
                                        {message.text}
                                    </div>
                                    <div className={`text-xs text-gray-500 mt-1 ${message.isBot ? '' : 'text-right'}`}>
                                        {message.timestamp.toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <Bot size={10} />
                                </div>
                                <div className="bg-white p-2.5 rounded-xl rounded-tl-sm shadow-sm border">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                                    <Bot size={10} />
                                </div>
                                <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl rounded-tl-sm">
                                    <div className="text-xs text-red-600">
                                        Xin lỗi, đã có lỗi xảy ra: {error}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập câu hỏi..."
                                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-16"
                                rows="1"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || loading}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                                ) : (
                                    <Send size={14} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                    <MessageCircle size={20} />
                </button>
            )}
        </div>
    );
};

export default Chatbot;