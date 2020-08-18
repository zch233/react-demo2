import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  margin-top: 60px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
  .des {
    font-size: 18px;
    h2 {
      font-weight: 600;
      font-size: 36px;
      margin-top: -10px;
    }
  }
`;
export const AdvanceList = styled.article`
  display: flex;
`;
export const AdvanceListItem = styled.div`
  text-align: center;
  svg {
    font-size: 50px;
  }
  .advance-title {
    color: #333;
    margin-top: 20px;
    font-size: 16px;
    margin-bottom: 6px;
    width: 13em;
  }
`;
