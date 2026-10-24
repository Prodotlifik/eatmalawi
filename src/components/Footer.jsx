const Footer = () => {
  return (
    <footer
      style={{
        marginTop: 64,
        padding: "32px 24px",
        borderTop: "1px solid #e5e5e5",
        backgroundColor: "#ffffff"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>EatMalawi</div>
          <p style={{ margin: "6px 0 0", color: "#666", fontSize: 14 }}>
            Discover restaurants and menus across Malawi.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 14,
            color: "#666",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <span>About</span>
          <span>Contact</span>
          <span>List your restaurant</span>
          <span>© {new Date().getFullYear()} EatMalawi</span>
          <span>
            Built by <strong>Mtisunge Liomba</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
