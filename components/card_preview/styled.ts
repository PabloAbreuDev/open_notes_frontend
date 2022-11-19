import styled from "styled-components";

export const CardPreviewStyled = styled.div`
  background-color: #202024;
  border-radius: 5px;
  padding: 20px 20px;
  border: solid 1px #e6e6e6;
  height: 310px;
  width: 300px;

  pre {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    font-family: "Roboto";
  }

  .header_card {
    background-color: #202024;
    height: 10%;
    .title {
      font-size: 1.3em;
      font-weight: 800;
    }
  }
  .body {
    height: 75%;
    overflow: hidden;
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
    height: 10px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    bottom: 0;
    color: #000;
  }
`;

export const TagStyled = styled.div`
  padding: 2px 10px;
  border-radius: 25px;
  background-color: #e6e6e6;
  font-size: 0.8em;
`;
