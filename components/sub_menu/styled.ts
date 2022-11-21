import styled from "styled-components";

export const SubMenuStyled = styled.div`
  .dropdown {
    position: relative;
  }
  .menu {
    position: absolute;
    border-radius: 6px;
    list-style-type: none;
    width: 150px;
    max-height: 130px;
    overflow-y: auto;
  }

  li {
    background-color: white;
    padding-left: 10px;
    &:hover {
      background-color: lightgray;
    }
  }
`;
