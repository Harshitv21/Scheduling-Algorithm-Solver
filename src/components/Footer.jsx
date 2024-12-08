import "../styles/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Developed by <strong>Harshit Verma</strong>
      </p>
      <p>
        <a
          href="https://github.com/Harshitv21"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub Profile <img src="Github icon.svg" />
        </a>
        {" | "}
        <a
          href="https://github.com/Harshitv21/Scheduling-Algorithm-Solver"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Project Repository <img src="Repository icon.svg" />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
