import styled from "styled-components";

export const HomeStyled = styled.div`
  background-color: #121214;
  color: #e1e1e6;
  .header {
    width: 100%;
    background-color: #202024;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  }
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  .hamburger {
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
        width: 90%;
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
    .icon {
      min-width: 30px;
      min-height: 20px;
      cursor: pointer;
    }
  }

  .presentation {
    display: flex;
    height: calc(100vh - 60px);

    .side_bar {
      padding: 10px;
      flex: 1;
    }

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
      }
    }
  }
`;
