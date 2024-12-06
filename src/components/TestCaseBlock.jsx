import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa";
import "../styles/TestCaseBlock.css";

const TestCaseBlock = ({ passedTC }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(passedTC).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-container">
      <button
        className="copy-btn"
        onClick={handleCopy}
        style={{
          color: copied ? "green" : "gray",
        }}
      >
        {copied ? <FaCheck /> : <FaCopy />}
      </button>
      <SyntaxHighlighter language="plaintext" style={darcula}>
        {passedTC}
      </SyntaxHighlighter>
    </div>
  );
};

export default TestCaseBlock;
