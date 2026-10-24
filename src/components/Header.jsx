const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid #e5e5e5",
        backgroundColor: "#ffffff"
      }}
    >
      <img
        src="/Logo.png"
        alt="EatMalawi"
        style={{ height: 40, width: "auto", display: "block" }}
      />
      <span style={{ fontSize: 14, color: "#666" }}>
        Browse menus. Decide faster.
      </span>
    </header>
  );
};

export default Header;
