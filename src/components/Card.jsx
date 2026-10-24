const Card = ({ children, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={typeof children === "string" ? children : undefined}
      className="restaurant-card"
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        backgroundColor: "var(--bg-white)",
        boxShadow: "var(--shadow-md)",
        cursor: "pointer",
        transition: "var(--transition)",
        border: "1px solid var(--border-color)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onFocus={(e) => (e.currentTarget.style.outline = "3px solid var(--primary)")}
      onBlur={(e) => (e.currentTarget.style.outline = "none")}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div style={{ padding: 16 }}>{children}</div>;
};

export { Card, CardContent };
