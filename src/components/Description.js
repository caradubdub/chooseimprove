import styled from "styled-components";
import React from "react";

const StyledP = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
`;
function Description(props) {
  //const items = new Array((props.description).length).fill('');
  let descriptions = props.description.split(/\n/gi);
  const desc = descriptions.map((para, i) => {
    return (
      <div style={{ marginBottom: "1.5rem" }} key={i}>
        <StyledP>{para}</StyledP>
      </div>
    );
  });
  return <>{desc}</>;
}

export default Description;
