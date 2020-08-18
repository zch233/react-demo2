import styled from 'styled-components';

export const TopBar = styled.section`
  background-color: rgba(252, 255, 246, 0.1);
  color: #ffffff82;
  padding: 0.7em 0;
  font-size: 12px;
  .pageWidthWithCenter {
    display: flex;
    justify-content: space-between;
    svg {
      margin-right: 0.6em;
    }
  }
`;
export const SearchBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 28px;
  .imageWrapper {
    width: 300px;
  }
  .searchWrapper {
    margin-right: 150px;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    .searchInput {
      width: 22em;
      border: 1px #285b70 solid;
      background: rgba(92, 99, 117, 0.62);
      border-radius: 10px 0 0 10px;
      line-height: 50px;
      padding: 0 10px;
      border: none;
      outline: none;
      :focus {
        //background: rgba(155, 162, 181, 0.62);
      }
    }
    button {
      background-color: #f1c722;
      font-size: 20px;
      color: #ffffff;
      line-height: 50px;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      border: none;
      outline: none;
      padding: 0 1.6em;
    }
  }
`;
export const NavBar = styled.nav`
  background-color: #9b0000;
  color: #fff;
  line-height: 37px;
  font-size: 16px;
  box-shadow: 0 1px 4px #282727;
  .pageWidthWithCenter {
    display: flex;
    align-items: center;
  }
  .navList {
    display: inline-flex;
    margin: 0;
    a {
      color: #fff;
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      font-size: 15px;
    }
    .navList-item {
      border-right: 1px #931900 solid;
      border-left: 1px #a52600 solid;
      &:hover {
        background-color: #841c02;
      }
      &.active {
        background-color: #6c1500;
        box-shadow: 0 0 10px #4f0000 inset;
      }
    }
  }
  .allCategory {
    background-color: #d03322;
    padding: 0 7em 0 16px;
    font-weight: 400;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1031;
    line-height: 2.4;
    > svg {
      margin-left: 1em;
      font-size: 0.5em;
      vertical-align: 0;
    }
    .hideInput {
      position: absolute;
      opacity: 0;
      z-index: -1;
      top: -14px;
      left: 0;
      width: 0;
      padding: 0;
      border: 0;
    }
  }
  .userOrLogin {
    margin-left: auto;
    font-size: 14px;
    border-radius: 18px;
    background-color: #ffffff3e;
    padding: 0 15px;
    line-height: 34px;
    position: relative;
    .loginSwitch {
      color: #b8dafc;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
`;
export const LoginDialogWrapper = styled.div`
  padding: 1.5em 0;
  width: 260px;
  .input {
    margin-bottom: 1em;
  }
  .loginButton {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    &:hover {
      color: #fff;
      background-color: #449d44;
      border-color: #398439;
    }
  }
  .toSignIn {
    display: inline-block;
    margin-top: 3em;
    color: rgb(51, 51, 51);
    &:hover {
      color: #23527c;
    }
  }
`;
export const CategoryDialogWrapper = styled.div`
  margin: -12px -16px;
  background-color: #d03322;
  font-size: 16px;
  display: flex;
  .mainCategory {
    margin: 0;
    width: 15em;
    display: flex;
    flex-direction: column;
    height: 20.82vw;
    position: relative;
    &-item {
      flex: 1;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 0 15px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #fff;
        color: #d03322;
        .detailCategory {
          display: block;
        }
      }
      .icon {
        color: #000;
        margin-right: 0.7em;
        font-size: 19px;
      }
      .right {
        margin-left: auto;
        width: 0.4em;
      }
    }
  }
  .detailCategory {
    background-color: #fff;
    padding: 15px 0 15px 15px;
    overflow-y: auto;
    height: 20.82vw;
    position: absolute;
    left: 100%;
    top: 0;
    width: 68.5em;
    border: 2px solid #d03322;
    border-left: none;
    font-size: 14px;
    display: none;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
    &-item {
      line-height: 2.5;
      cursor: pointer;
      color: #333;
      border-bottom: 1px dashed #ddd;
      margin: 0;
      transition: all 0.3s;
      &:hover {
        background-color: #d03322;
        color: #fff;
      }
    }
  }
`;