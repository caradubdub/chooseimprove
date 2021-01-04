import styled from "styled-components";

export const StyledPage = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  height: 100vh;
  width: 100%;
  background: #a5ebd6;
`;

export const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 40%;
  background: #a5ebd6;
  order: 1;
`;

export const StyledRightPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 60%;
  background: white;
  order: 2;
`;
