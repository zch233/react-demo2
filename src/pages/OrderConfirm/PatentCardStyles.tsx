import styled from 'styled-components';

export const Wrapper = styled.article`
  margin-bottom: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .preTips {
    margin: -12px -12px 30px;
    background-color: #fdf6ec;
    color: #e6a23c;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 6px 16px;
    font-size: 12px;
    svg {
      margin-right: 0.4em;
      font-size: 12px;
    }
  }
  .patent {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    .imageWrapper {
      width: 28%;
      border: 1px solid #ddd;
      padding: 4px;
      border-radius: 4px;
      margin-right: 4%;
    }
    .info {
      flex: 1;
      color: #333;
      &-title {
        font-size: 22px;
        margin-bottom: 30px;
        font-weight: 700;
      }
      &-detail {
        display: flex;
        justify-content: space-between;
        padding-right: 18%;
        font-size: 15px;
        &-item {
          display: flex;
          label {
            width: 5em;
            display: inline-block;
            text-align: justify;
            text-align-last: justify;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
