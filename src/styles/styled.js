import styled from "styled-components";

export const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100vh;
  width: 100%;
`;

export const StyledTopPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 25%;
  box-shadow: 0 9px 5px -2px lightgray;
  order: 1;
`;

export const StyledRightPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1 1 60%;
  order: 2;
  background-image: url(https://images.squarespace-cdn.com/content/v1/5fdbcb0c485f552352d42446/1609272769581-SSWFVNYVG3P6JWQF34JH/ke17ZwdGBToddI8pDm48kEsJSoP_ZzIgFsI06Qp1mKEUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2doIxm5VjAj0FvR8pp9Bixj7JQWY3TV0_q_wgxjWShNbEH3bqxw7fF48mhrq5Ulr0Hg/header5.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
`;
