import React, { useEffect, useState, useRef } from "react";
import GlobalStyle from "./styles/global";
import {
  StyledPage,
  StyledTopPanel,
  StyledRightPanel,
} from "../src/styles/styled";
import styled from "styled-components";
import DropDown from "./components/DropDown";
import Description from "./components/Description";
const dotenv = require("dotenv").config();
let key = process.env.AIRTABLE_API_KEY;
console.log(process.env);
var Airtable = require("airtable");
const base = new Airtable({
  apiKey: key,
}).base("appk8Vq73Nru1TXvz");

const StyledButton = styled.button`
  padding: 8px 20px 8px 20px;
  top: 70vh;
  z-index: 0;
  font: inherit;
  color: #fffbf5;
  background-color: #f4c430;
  border: 0.5px solid #f4c430;
  border-radius: 30px;
  &:hover {
    background-color: #f3d371;
    border: 0.5px solid #f3d371;
  }
  cursor: pointer;
`;

const StyledText = styled.h1`
  font-size: 30px;
  align-self: center;
  text-align: center;
  flex-basis: 20%;
  margin-bottom: 10px;
  color: #12355b;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: auto;
  padding: auto;
  border-radius: 20px;
  background-color: transparent;
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
      <span style={{ color: "#12355B" }}>{text}</span>
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
  const [description, setDesc] = useState([
    "Choose a category and click go to start!",
  ]);

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
              let idx = Math.floor(Math.random() * arr.length);
              setPrompt(arr[idx]);
              console.log("notes", prompt.fields.Notes);
              // let split = prompt.fields.Description.split("");
              // console.log("split1", split);
              // console.log("type of field", typeof prompt.fields.Description);
              let newstr = prompt.fields.Description.split(/\n/gi);
              setDesc(newstr);
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          boxShadow: "0 9px 5px -2px lightgray",
        }}
      >
        <img
          style={{ width: "20vw", padding: "10px 0 10px 20px" }}
          src="https://static1.squarespace.com/static/5fdbcb0c485f552352d42446/t/5feb4ef5be26463ba9454d6b/1610900141277/?format=1500w"
        />
      </div>
      <StyledTopPanel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <StyledText style={{ paddingTop: "2rem" }}>
              Today I want to improve...
            </StyledText>

            <div>
              <img
                style={{ width: "30vw" }}
                src="https://images.squarespace-cdn.com/content/v1/5fdbcb0c485f552352d42446/1610895013646-BFWFN6UBFIXP13ATSXXW/ke17ZwdGBToddI8pDm48kL8B3dm5W1mn-onLqnk26fJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIK_FmWmlZglY2AzqA3xXvLLNSddWHUhxiZ7r7T7sSjs8/improve-home2.gif"
                alt="improve-home2.gif"
              />
            </div>
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
          </div>
        </div>
      </StyledTopPanel>
      <StyledRightPanel>
        <StyledCard>
          <div>
            <h1>{prompt.fields.Name}</h1>
            <Description description={prompt.fields.Description} />
            <StyledP>{prompt.fields.Notes}</StyledP>
          </div>
        </StyledCard>
      </StyledRightPanel>
    </StyledPage>
  );
}

export default App;
