import styled from 'styled-components';

export const PatentNavigation = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  .navigation {
    a {
      color: inherit;
    }
    color: #132e41;
    padding-left: 1em;
    margin-left: 0.5em;
    border-left: 1px solid #ddd;
    &:hover {
      color: #23527c;
    }
  }
`;
export const Wrapper = styled.article`
  background-color: #fff;
  margin: 15px auto;
  padding: 15px;
  display: flex;
  align-items: center;
`;
export const PatentInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  .imageWrapper {
    border: 1px solid #ddd;
    padding: 4px;
    border-radius: 4px;
    width: 38%;
  }
  .info {
    padding: 0 3%;
    flex: 1;
    h1 {
      font-size: 20px;
      font-weight: 500;
      border-bottom: 1px dashed #bbb;
      padding-bottom: 1.4em;
    }
    .itemWrapper {
      display: flex;
      border-bottom: 1px dashed #bbb;
      padding-bottom: 0.9em;
      font-size: 15px;
      color: #000;
      margin-bottom: 1em;
      align-items: flex-end;
      .item-left {
        flex: 3;
      }
      .item-right {
        flex: 2;
      }
      label {
        font-weight: 600;
        color: #666;
        width: 4.6em;
        display: inline-block;
        margin-right: 1.4em;
        text-align: justify;
        text-align-last: justify;
      }
      .mark {
        font-size: 15px;
      }
      .vipPrice {
        color: #a94442;
        font-size: 26px;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .buyButton {
        background-color: #d9534f;
        border-color: #d43f3a;
        border-radius: 6px;
        &:hover {
          background-color: #c9302c;
          border-color: #ac2925;
        }
      }
      .buyTips {
        color: #777;
        font-size: 12px;
      }
    }
  }
`;
export const ShopInfo = styled.div`
  border: 1px solid #faebcc;
  text-align: center;
  width: 270px;
  border-radius: 4px;
  .topBar {
    background-color: #dff0d8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      font-size: 70px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #ddd;
      padding: 14px;
      box-sizing: content-box;
      line-height: 0.9;
      color: #bbb;
      margin-top: 25px;
    }
    p {
      font-size: 20px;
      margin-top: 15px;
      padding: 0 0.8em;
      border-radius: 2em;
      color: #3c763d;
      background-color: #fff;
      display: inline-block;
    }
  }
  .bottomBar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #3c763d;
    font-size: 16px;
    padding: 15px 0;
    svg {
      margin-right: 0.4em;
      font-size: 19px;
    }
    p {
      margin: 6px 0;
      text-align: left;
      text-indent: 5.4em;
    }
  }
`;
