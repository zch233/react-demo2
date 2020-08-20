import styled from 'styled-components';

export const Wrapper = styled.footer`
  color: #aaa;
  padding-top: 20px;
`;
export const WebSiteHelp = styled.div`
  display: flex;
  margin-bottom: 10px;
  .title {
    font-size: 16px;
    color: #fff;
  }
  .reason {
    font-size: 14px;
  }
`;
export const ChooseUs = styled.div`
  margin-right: 10%;
`;
export const Solution = styled.div`
  margin-right: 10%;
  .reasonWrapper {
    display: flex;
    justify-content: space-between;
  }
`;
export const Questions = styled.div`
  .reason {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export const QrCode = styled.div`
  margin-left: auto;
`;
export const CopyRight = styled.div`
  text-align: center;
  a {
    color: #aaa;
    display: inline-flex;
    align-items: center;
    margin-right: 2em;
  }
  .gov {
    margin-bottom: 0;
  }
`;
