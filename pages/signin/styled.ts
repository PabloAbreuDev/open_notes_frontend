import styled from "styled-components";

export const SignInBackGround = styled.div`
  background: #bfe7f6;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SingInPanel = styled.div`
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

    form {
      .form-group {
        label {
          width: 100%;
        }
        div {
          margin-bottom: 4px;
        }
        input {
          border: solid 1px #e6e6e6;
          border-radius: 8px;
          padding: 10px 5px 10px 5px;
          width: 100%;

          :focus {
            outline: solid 2px orange;
          }
        }
        .error-message {
          height: 15px;
          color: red;
        }
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
