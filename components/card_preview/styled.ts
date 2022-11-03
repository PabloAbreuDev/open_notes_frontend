import styled from "styled-components";

export const CardPreviewStyled = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 20px;
  border: solid 1px #e6e6e6;
  height: 310px;
  width: 20%;

  .header {
    height: 10%;
    .title {
      font-size: 1.3em;
      font-weight: 800;
    }
  }
  .body {
    height: 80%;
    overflow: hidden;
    overflow-wrap: break-word;
    .content {
      margin-top: 10px;
      font-size: 1em;
      font-weight: 400;
    }
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
  }

  .footer {
    padding-top: 10px;
    height: 10;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    bottom: 0;
  }
`;

export const TagStyled = styled.div`
  padding: 2px 10px;
  border-radius: 25px;
  background-color: #e6e6e6;
  font-size: 0.8em;
`;
