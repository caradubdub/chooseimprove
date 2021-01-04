import React, { useEffect, useState, useRef } from "react";
import GlobalStyle from "./styles/global";
import {
  StyledPage,
  StyledLeftPanel,
  StyledRightPanel,
} from "../src/styles/styled";
import styled from "styled-components";
import DropDown from "./components/DropDown";

var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyVYdVRJdKVpuQtq",
});
var base = Airtable.base("appk8Vq73Nru1TXvz");

const StyledButton = styled.button`
  padding: 10px 30px 10px 30px;
  position: fixed;
  top: 70vh;
  z-index: 0;
  font: inherit;
  color: white;
  background-color: #29bc90;
  border: 0.5px solid #29bc90;
  border-radius: 5px;
  &:hover {
    background-color: #219170;
  }
  cursor: pointer;
`;

const StyledText = styled.h1`
  font-size: 54px;
  align-self: center;
  text-align: center;
  flex-basis: 20%;
  margin-bottom: 10px;
  color: white;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 55vw;
  height: auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #a5ebd6;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledP = styled.p`
  font-size: 2vh;
  line-height: 3vh;
`;

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
      <span style={{ color: "white" }}>{text}</span>
      <span id="cursor" />
    </StyledText>
  );
}

function App() {
  const wrapperRef = useRef(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [key, setKey] = useState("");
  const [prompt, setPrompt] = useState({
    fields: {
      Name: "",
      Description: "Choose a category and click go to start!",
      Notes: "",
    },
  });

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        console.log("handleclick");
        setIsListOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleList = () => {
    setIsListOpen(!isListOpen ? true : false);
  };
  const handleClick = () => {
    console.log("key", key);
    async function retfunc() {
      let arr = [];
      //need to add async functionality to wait to collect results before populating
      await base("Improve Exercises")
        .select({
          // Selecting the first 3 records in Master View:
          view: "Master View",
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function (record) {
              let areas = record.get("Category");
              if (areas) {
                if (areas.includes(key)) {
                  arr.push(record);
                }
              }
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            } else {
              if (!arr.length) return;
              console.log("arr", arr);
              let idx = Math.floor(Math.random() * arr.length);
              console.log("idx", idx);
              setPrompt(arr[idx]);
              console.log(prompt);
              return;
            }
          }
        );
    }
    return retfunc();
  };
  const [location, setLocation] = useState([
    {
      id: 0,
      title: "joy",
      selected: false,
      key: "Joy",
    },
    {
      id: 1,
      title: "creativity",
      selected: false,
      key: "Creativity",
    },
    {
      id: 2,
      title: "connection",
      selected: false,
      key: "Connection",
    },
    {
      id: 3,
      title: "humor",
      selected: false,
      key: "Humor",
    },
    {
      id: 4,
      title: "energy",
      selected: false,
      key: "Energy",
    },
    {
      id: 5,
      title: "resilience",
      selected: false,
      key: "Resilience",
    },
    {
      id: 6,
      title: "focus",
      selected: false,
      key: "Focus",
    },
    {
      id: 7,
      title: "self-awareness",
      selected: false,
      key: "Self-Awareness",
    },
    {
      id: 8,
      title: "gratitude",
      selected: false,
      key: "Gratitude",
    },
    {
      id: 9,
      title: "adaptability",
      selected: false,
      key: "Adaptability",
    },
    {
      id: 10,
      title: "achievement",
      selected: false,
      key: "Achievement",
    },
  ]);

  const resetThenSet = (id, key) => {
    const temp = [...key];

    // temp.forEach((item) => (item.selected = false));
    // temp[id].selected = true;

    setKey(key);
  };
  return (
    <StyledPage>
      <StyledLeftPanel>
        <StyledText style={{ paddingTop: "2rem" }}>
          Today I want to improve...
        </StyledText>
        <Typer
          dataText={[
            "joy",
            "creativity",
            "connection",
            "humor",
            "energy",
            "resilience",
            "focus",
            "self-awareness",
            "gratitude",
            "adaptability",
            "achievement",
          ]}
        />
        <div ref={wrapperRef}>
          <DropDown
            title="Choose Category"
            list={location}
            resetThenSet={resetThenSet}
            isListOpen={isListOpen}
            setIsListOpen={setIsListOpen}
            toggleList={toggleList}
          />
        </div>
        <StyledButton onClick={handleClick}>Go!</StyledButton>
      </StyledLeftPanel>
      <StyledRightPanel>
        <StyledCard>
          <div>
            <h1>{prompt.fields.Name}</h1>
          </div>
          <div>
            <StyledP>{prompt.fields.Description}</StyledP>
          </div>
        </StyledCard>
      </StyledRightPanel>
    </StyledPage>
  );
}

export default App;
