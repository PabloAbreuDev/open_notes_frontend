import styled from "styled-components";

export const SubMenuStyled = styled.div`
  .dropdown {
    position: relative;
  }
  .menu {
    position: absolute;

    list-style-type: none;
    margin: 5px 0;
    padding: 0;

    border: 1px solid grey;
    width: 150px;
    max-height: 130px;
    overflow-y: auto;
  }
  li {
    margin: 0;

    background-color: white;
    &:hover {
      background-color: lightgray;
    }

    button {
      width: 100%;
      height: 100%;
      text-align: left;
      background: none;
      color: inherit;
      border: none;
      padding: 5px;
      margin: 0;
      font: inherit;
      cursor: pointer;
    }
  }
`;
