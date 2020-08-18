import styled from 'styled-components';

export const Section = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const Title = styled.h3`
  font-weight: 600;
  font-size: 22px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .option {
    color: #aaa;
    font-size: 14px;
    font-weight: normal;
  }
`;
export const PatentList = styled.ul`
  display: flex;
`;
export const PatentListItem = styled.li`
  border: 1px solid #ededed;
  width: 16.66%;
  margin-right: 1.3%;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;
  &:hover {
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    transition: all 0.3s ease;
    transform: translateY(-6px);
  }
  &:last-child {
    margin-right: 0;
  }
  .patentInfo {
    display: flex;
    flex-direction: column;
    height: 6em;
    padding-top: 8px;
    &-des {
      font-size: 20px;
      font-weight: 700;
      color: #ff4400;
      letter-spacing: 0.8px;
      margin-top: auto;
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 1;
      em {
        margin: 0;
      }
      span {
        font-size: 12px;
        color: #888;
        font-weight: normal;
      }
    }
    &-price {
      font-size: 20px;
      font-weight: 700;
      color: #ff4400;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
      em {
        font-weight: normal;
        word-break: break-all;
      }
      span {
        font-size: 12px;
        color: #888;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    &-title {
      color: #3d3d3d;
      line-height: 1.4;
    }
    &-status {
      margin-bottom: 0;
      margin-top: auto;
      font-size: 12px;
    }
  }
`;
