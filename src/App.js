//pull in video from link to demo and embedding under everything
//capture other links in description?
//try to capture italics and other txt formatting "I am that" connection, joy self-awareness, gratitude

import React, { useEffect, useState, useRef } from "react";
import GlobalStyle from "./styles/global";
import { StyledPage, StyledTopPanel, StyledRightPanel } from "./styles/styled";
import styled from "styled-components";
import DropDown from "./components/DropDown";
import Description from "./components/Description";
import Links from "./components/Links";

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = new Airtable.base("appk8Vq73Nru1TXvz");

const StyledButton = styled.button`
  padding: 8px 20px 8px 20px;
  margin-left: 40px;
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
  flex-basis: 30%;
  margin-bottom: 10px;
  font-family: inherit;
  color: #12355b;
  padding-top: 1rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  minwidth: 500px;
  height: auto;
  padding: auto;
  border-radius: 20px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledP = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
`;

const StyledTopColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media only screen and (max-width: 500px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const StyledTopRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
`;

const StyledGif = styled.img`
  width: 250px;
  @media only screen and (max-width: 500px) {
    width: 50vw;
  }
`;

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
  const [linksarr, setLinksArr] = useState([]);

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
          style={{
            width: "20%",
            minWidth: "180px",
            padding: "10px 0 10px 20px",
          }}
          src="https://static1.squarespace.com/static/5fdbcb0c485f552352d42446/t/5feb4ef5be26463ba9454d6b/1610900141277/?format=1500w"
        />
      </div>
      <StyledTopPanel>
        <StyledTopColumn>
          <StyledTopRow>
            <StyledText>Today I want to improve...</StyledText>

            <StyledGif
              src="https://images.squarespace-cdn.com/content/v1/5fdbcb0c485f552352d42446/1610895013646-BFWFN6UBFIXP13ATSXXW/ke17ZwdGBToddI8pDm48kL8B3dm5W1mn-onLqnk26fJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIK_FmWmlZglY2AzqA3xXvLLNSddWHUhxiZ7r7T7sSjs8/improve-home2.gif"
              alt="improve-home2.gif"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <DropDown
                title="Choose Category"
                list={location}
                resetThenSet={resetThenSet}
                isListOpen={isListOpen}
                setIsListOpen={setIsListOpen}
                toggleList={toggleList}
              />
              <StyledButton onClick={handleClick}>Go!</StyledButton>
            </div>
          </StyledTopRow>
        </StyledTopColumn>
      </StyledTopPanel>
      <StyledRightPanel>
        <StyledCard>
          <div style={{ paddingBottom: "10px" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              {prompt.fields.Name}
            </h1>
            <Description
              description={prompt.fields.Description}
              notes={prompt.fields.Notes}
            />
            <StyledP>{prompt.fields.Notes}</StyledP>

            <Links
              description={prompt.fields.Description}
              notes={prompt.fields.Notes}
            />
          </div>
        </StyledCard>
      </StyledRightPanel>
    </StyledPage>
  );
}

export default App;
