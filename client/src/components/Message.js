import "../styles/message.css";
const Message = ({ variant, children }) => {
  return (
    <div className={`message ${variant === "info" ? "info" : "danger"}`}>
      {children}
    </div>
  );
};

export default Message;
