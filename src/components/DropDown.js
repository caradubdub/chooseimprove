import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const DDWrapper = styled.div`
  position: relative;
  width: 222px;
  font-size: 1.2rem;
  user-select: none;
`;

const DDHeader = styled.button`
  display: flex;
  width: 15rem;
  font-size: 1.2rem;
  position: relative;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  background-color: white;
  line-height: 38px;
  cursor: default;
  cursor: pointer;
  justify-content: center;
  padding-right: 7px;
`;

const DDHeadTitle = styled.div`
  margin: 2px 20px;
  margin-right: 30px;
  font-weight: 300;
`;

const DDList = styled.div`
  position: relative;
  overflow-y: auto;
  z-index: 10;
  width: 15rem;
  max-height: 215px;
  border: 1px solid rgb(223, 223, 223);
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
  background-color: white;
  font-weight: 700;
  text-align: center;
  -webkit-overflow-scrolling: touch;
`;

const DDListItem = styled.button`
  display: inline-block;
  overflow: hidden;
  width: 14rem;
  padding: 8px 10px;
  font-size: 1.5rem;
  line-height: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: default;
  cursor: pointer;
  background-color: white;
  font-size: 1.2rem;
  border: transparent;
  &:hover {
    background-color: lightgray;
  }
`;

function DropDown(props) {
  const [headerTitle, setHeaderTitle] = useState(props.title);

  const selectItem = (item) => {
    const resetThenSet = props.resetThenSet;
    const { title, id, key } = item;

    setHeaderTitle(title);
    props.setIsListOpen(false);
    resetThenSet(id, key);
  };

  return (
    <DDWrapper>
      <DDHeader type="button" onClick={props.toggleList}>
        <div style={{ display: "flex", width: "15rem" }}>
          <div
            style={{
              flexDirection: "row",
              flexBasis: "100%",
              justifyContent: "flex-end",
              textAlign: "center",
            }}
          >
            <DDHeadTitle>{headerTitle} </DDHeadTitle>
          </div>
          <div
            style={{
              flexDirection: "row",
              flexBasis: "auto",
              justifyContent1: "flex-end",
              marginLeft: "auto",
            }}
          >
            {props.isListOpen ? (
              <FontAwesome name="angle-up" size="2x" />
            ) : (
              <FontAwesome name="angle-down" size="2x" />
            )}
          </div>
        </div>
      </DDHeader>
      {props.isListOpen && (
        <DDList>
          {props.list.map((item) => (
            <DDListItem
              type="button"
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {" "}
              {item.title} {item.selected && <FontAwesome name="check" />}
            </DDListItem>
          ))}
        </DDList>
      )}
    </DDWrapper>
  );
}

export default DropDown;
