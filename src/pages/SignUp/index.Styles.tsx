import styled from 'styled-components';

export const Wrapper = styled.section`
  background-color: #fff;
  padding: 30px 50px;
  border-radius: 4px;
  width: 400px;
  height: 80%;
  user-select: none;
  h3 {
    text-align: center;
    color: #00651d;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 30px;
  }
  .input {
    margin-bottom: 15px;
  }
  .checkbox {
    margin-bottom: 10px;
    user-select: none;
  }
  .signUpButton {
    margin-bottom: 15px;
    background-color: #5cb85c;
    border-color: #4cae4c;
    color: #fff;
    &:hover {
      background-color: #449d44;
      border-color: #398439;
    }
  }
`;
