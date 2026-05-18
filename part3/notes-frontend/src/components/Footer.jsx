const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
  };

  return (
    <div style={footerStyle}>
      <br />
      <p>
        UI build {__BUILD_DATE__}
      </p>
    </div>
  );
};

export default Footer;
