import styled from "styled-components";

export const CardModalStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .card_modal_content {
    width: 40vw;
    background-color: #fff;
    border-radius: 8px;
    overflow-x: auto;

    color: #000;

    textarea {
      width: 100%;
      height: 100%;
      border-color: Transparent;
      outline: none;
      resize: none;
      overflow-y: hidden;
    }

    .card_modal_header {
      font-weight: 400;
      padding: 10px;
      outline: none;
      textarea {
        font-family: "Roboto";
        font-weight: 500;
        font-size: 1.4rem;
      }
    }

    .card_modal_body {
      font-size: 1rem;
      max-height: 500px;
      overflow-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 10px 0 10px;

      white-space: pre-wrap;
      word-wrap: break-word;
      textarea {
        font-family: "Roboto";
        font-size: 1rem;
      }

      /* width */
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

      .card_modal_body_text {
        outline: none;
      }
      .tags {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        user-select: none;
        color: #000;

        .tag_space {
          cursor: pointer;
          display: flex;

          .remove_tag {
            opacity: 0;
            transition: ease 0.1s all;
          }

          &:hover {
            .remove_tag {
              opacity: 1;

              padding: 2px 10px;
              border-radius: 25px;
              background-color: #e6e6e6;
              font-size: 0.8em;
              margin-left: -15px;
            }
          }
        }
      }
    }

    .card_modal_footer {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
      height: 40px;
      padding: 10px;
      gap: 20px;
      font-size: 18px;
      color: #333333;

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
      }

      .menu > li {
        margin: 0;

        background-color: white;
      }

      .menu > li:hover {
        background-color: lightgray;
      }

      .menu > li > button {
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

      .icon {
        display: flex;
        padding: 5px;
        align-items: center;
        justify-content: center;
        &:hover {
          border-radius: 100%;
          background-color: #999999;
          transition: ease 0.4s all;
          cursor: pointer;
        }
      }
    }
  }
`;
