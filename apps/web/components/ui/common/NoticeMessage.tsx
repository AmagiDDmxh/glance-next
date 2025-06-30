import type React from "react";

interface NoticeMessageProps {
  message: string;
}

const NoticeMessage: React.FC<NoticeMessageProps> = ({ message }) => {
  return (
    <div className="notice-message">
      <p>{message}</p>
    </div>
  );
};

export default NoticeMessage;
