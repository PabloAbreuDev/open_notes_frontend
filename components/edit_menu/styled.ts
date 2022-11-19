import styled from "styled-components";

export const EditMenuStyled = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .edit_content {
    background-color: #fff;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;
    border-radius: 4px;
    color: #000;

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

    .name_area {
      font-size: 1.2em;
    }
    .create_input {
      form {
        input {
          width: 100%;
          border: none;
          border-bottom: solid 2px #e6e6e6;
          outline: none;
          margin-bottom: 10px;
          font-size: 1.1em;
        }
      }
    }

    .items_area {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;

        input {
          font: 1em Arial, Helvetica, sans-serif;
        }

        .icon {
          cursor: pointer;
        }
      }
    }
  }
`;

type TypeInputEditMenuItemStyled = {
  active: boolean;
};
export const InputEditMenuItemStyled = styled.div<TypeInputEditMenuItemStyled>`
  input {
    outline: none;
    border: none;
    border-bottom: ${(props) => (props.active ? "solid 1px black" : "none")};
    background-color: ${(props) => (props.active ? "#F0F8FF" : "#fff")};
  }
`;
