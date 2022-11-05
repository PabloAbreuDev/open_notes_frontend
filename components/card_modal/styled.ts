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
    }
  }
`;
