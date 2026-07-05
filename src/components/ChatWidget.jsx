import { FaWhatsapp } from "react-icons/fa";

const ChatWidget = () => {
    return (
        <div className="chat-widget" role="button" aria-label="Chat with us">
            <FaWhatsapp className="w-6 h-6 text-white" />
        </div>
    );  
};

export default ChatWidget;
