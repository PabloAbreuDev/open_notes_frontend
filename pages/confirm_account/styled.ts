import styled from "styled-components";

export const ConfirmAccountBackGround = styled.div`
  background: #bfe7f6;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00a3e2;
`;

export const ConfirmAccountPanel = styled.div`
  display: flex;
  font-family: "Roboto", sans-serif;
  color: #262626;

  .content-box {
    width: 30vw;
    padding: 40px;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
      width: 95vw;
    }
  }

  .right-side {
    background-color: #ffe666;
    margin: 0 auto;

    h2 {
      font-weight: bold;
    }

    .action-buttons {
      margin-top: 10px;
      display: flex;
      gap: 15px;

      @media only screen and (max-width: 768px) {
        flex-direction: column;
      }
      button {
        padding: 13px 15px 13px 15px;
        width: 100%;
        border: solid 1px #d79086;
        background-color: #ff725e;
        color: #fff;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          background-color: #c15545;
        }
      }
    }
  }
`;
