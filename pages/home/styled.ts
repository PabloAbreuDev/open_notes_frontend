import styled from "styled-components";

type TypeHomeStyled = {
  sideBarOpen: boolean;
  openLogoutDropDown: boolean;
};

export const HomeStyled = styled.div<TypeHomeStyled>`
  background-color: #121214;
  color: #e1e1e6;
  overflow-x: hidden;

  .side_bar {
    height: 100%;
    width: ${(props) => (props.sideBarOpen ? "250px" : "0")};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #202024;
    border-right: 1px black solid;
    overflow-x: hidden;
    transition: 0.5s;
    white-space: nowrap;

    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    a {
      display: block;
      transition: 0.3s;

      &:hover {
        color: #f1f1f1;
      }
    }

    .item-list {
      display: flex;
      gap: 30px;
      margin-bottom: 10px;
      padding: 15px;
      cursor: pointer;

      .icon {
        min-width: 20px;
        min-height: 20px;
      }
      &:hover {
        background-color: rebeccapurple;
      }
    }
  }

  #main {
    transition: margin-left 0.5s;
    margin-left: ${(props) => (props.sideBarOpen ? "250px" : "0")};

    .header {
      width: 100%;
      background-color: #202024;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
    }
    .icon {
      cursor: pointer;
    }

    .search_bar {
      flex: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        outline: none;
        background-color: #121214;
        border: none;
        padding: 13px;
        color: #fff;
        border-radius: 8px;
        width: 50%;
        @media only screen and (max-width: 600px) {
          width: ${(props) => (props.sideBarOpen ? "0" : "90%")};
          visibility: ${(props) => (props.sideBarOpen ? "hidden" : "visible")};
        }
      }
    }
    .options {
      flex: 1;
      display: flex;
      gap: 20px;
      align-content: center;
      justify-content: center;
      @media only screen and (max-width: 600px) {
        gap: 10px;
      }
      .logout_area {
        .logout_dropdown {
          display: ${(props) => (props.openLogoutDropDown ? "block" : "none")};

          position: absolute;
          background-color: #202024;
          padding: 10px;
          margin-left: 10px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          cursor: pointer;

          @media only screen and (max-width: 600px) {
            margin-left: -50px;
          }
        }
      }
      .icon {
        min-width: 30px;
        min-height: 20px;
        cursor: pointer;
      }
    }

    .presentation {
      display: flex;
      min-height: 100vh;
      .content_area {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 60px;
        flex: 4;

        .new_note {
        }

        .my_cards {
          margin-top: 40px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
      }
    }
  }
`;
