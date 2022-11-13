import styled from "styled-components";

export const SidebarStyled = styled.div``;

export type TypeIconStyled = {
  active: boolean;
  isMenuOpen: boolean;
};
export const IconTitleStyled = styled.div<TypeIconStyled>`
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.active ? "#000" : "")};
  padding: 15px;
  border-radius: 12px;

  @media only screen and (max-width: 600px) {
    align-items: ${(props) => (props.isMenuOpen ? "center" : "initial")};
    justify-content: ${(props) => (props.isMenuOpen ? "center" : "initial")};

    label {
      display: ${(props) => (props.isMenuOpen ? "none" : "initial")};
    }
  }
  .icon {
    min-width: 20px;
    min-height: 20px;
  }
`;
