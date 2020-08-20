import styled from 'styled-components';

export const Wrapper = styled.article`
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .myCard {
    display: flex;
    flex-direction: column;
    height: 100%;
    .ant-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .price {
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    .label {
      font-weight: bold;
    }
  }
  .priceResult {
    em {
      font-size: 30px;
      font-weight: 700;
      color: rgb(228, 57, 60);
    }
  }
  .payRoute {
    margin-top: auto;
    color: #333;
    &-item {
      display: flex;
      align-items: center;
      border-top: 1px solid #ebeef5;
      padding: 10px 0;
      cursor: pointer;
      &-icon {
        font-size: 44px;
      }
      &-info {
        flex: 1;
        font-weight: bold;
        padding-left: 10px;
        p {
          margin: 0;
          font-size: 12px;
        }
      }
      &-radio {
        user-select: none;
        font-size: 14px;
        color: #fff;
        border: 1px solid rgb(228, 57, 60);
        border-radius: 50%;
        width: 1.8em;
        height: 1.8em;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          background-color: rgb(228, 57, 60);
        }
      }
    }
  }
  .payButton {
    border-top: 1px solid #ebeef5;
    padding-top: 14px;
    .button.canBuy {
      background-color: #d9534f;
      border-color: #d43f3a;
      &:hover {
        background-color: #c9302c;
        border-color: #ac2925;
      }
    }
    .button.orderBuy {
      background-color: #ec971f;
      border-color: #d58512;
      &:hover {
        background-color: #ec971f;
        border-color: #d58512;
      }
    }
  }
`;
