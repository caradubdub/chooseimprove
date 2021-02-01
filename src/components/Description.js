import styled from "styled-components";
import React from "react";

const StyledP = styled.p`
  font-size: 2vh;
  line-height: 3vh;
`;
function Description(props) {
  //const items = new Array((props.description).length).fill('');
  let descriptions = props.description.split(/\n/gi);
  console.log("props.description", descriptions);
  const desc = descriptions.map((para, i) => {
    return (
      <div>
        <p>{para}</p>
      </div>
    );
  });
  console.log("desc", desc);
  return <>{desc}</>;
}

export default Description;
