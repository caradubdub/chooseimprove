import styled from "styled-components";
import React from "react";

const StyledP = styled.p`
  font-size: 1.5vh;
  line-height: 3vh;
`;
function Description(props) {
  //const items = new Array((props.description).length).fill('');
  let descriptions = props.description.split(/\n/gi);
  const desc = descriptions.map((para, i) => {
    return (
      <div style={{ marginBottom: "2vh" }}>
        <StyledP>{para}</StyledP>
      </div>
    );
  });
  console.log("desc", desc);
  return <>{desc}</>;
}

export default Description;
