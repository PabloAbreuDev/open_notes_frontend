import styled from "styled-components";

export const NewNoteBoxStyled = styled.div`
  background-color: rebeccapurple;
  padding: 25px;
  border-radius: 100%;
  cursor: pointer;
  transition: ease 0.3s all;
  white-space: nowrap;
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: #19191a;
  }
`;
