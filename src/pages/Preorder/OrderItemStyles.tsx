import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px #ddd solid;
  margin-top: 15px;
  width: 100%;
  .topBar {
    display: flex;
    font-size: 12px;
    color: #000;
    background-color: #eee;
    p {
      margin: 0;
      padding: 10px;
    }
    .orderInfo {
      flex: 2.8;
      time {
        font-weight: bold;
        margin-right: 1em;
      }
    }
    .orderShop {
      flex: 1.5;
    }
    .orderManager {
      flex: 2;
      padding: 10px 30px 10px 10px;
      label {
        margin-right: 1em;
      }
    }
  }
  .bottomBar {
    display: flex;
    > div {
      padding: 10px;
    }
    .productInfo {
      display: flex;
      align-items: center;
      border-right: 1px solid #ddd;
      flex: 2.8;
      .imageWrapper {
        width: 80px;
      }
      .info {
        margin-left: 10px;
        flex: 1;
        .title {
          color: #31708f;
          font-size: 16px;
          line-height: 1.1;
          a {
            color: inherit;
            &:hover {
              color: #245269;
            }
          }
        }
        em {
          color: #777;
        }
      }
    }
    .productPrice {
      color: #000;
      border-right: 1px solid #ddd;
      flex: 1.5;
      font-size: 12px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      p {
        margin: 0;
      }
      .result {
        color: #e4393c;
        em {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .productStatus {
      flex: 1;
      border-right: 1px solid #ddd;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .productOptions {
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      .ant-btn {
        font-size: 12px;
        font-weight: bold;
        height: 26px;
      }
      p {
        margin: 0;
      }
      .countDown {
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        .ant-statistic {
          .ant-statistic-content {
            font-size: 12px;
          }
        }
        svg {
          margin-right: 0.3em;
          font-size: 14px;
        }
      }
      .delete {
        color: #000;
        font-size: 12px;
        &:hover {
          span {
            text-decoration: underline;
            color: #23527c;
          }
        }
      }
    }
  }
`;
