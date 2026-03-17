type DeleteButtonProps = {
  onClick?: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#ffe5e0",
        color: "#d14300",
        border: "none",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#ffd6cc";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#ffe5e0";
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;