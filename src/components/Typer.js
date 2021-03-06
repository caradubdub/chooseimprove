function Typer(props) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const handleType = () => {
    const dataText = props.dataText;
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    setTypingSpeed(isDeleting ? 100 : 150);

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  setTimeout(handleType, typingSpeed);

  return (
    <StyledText>
      <span style={{ color: "#12355B" }}>{text}</span>
      <span id="cursor" />
    </StyledText>
  );
}
