import styled from 'styled-components';
const color = '#ac2925';
export const Wrapper = styled.section`
  background-color: #fff;
  padding: 10px 10%;
  .steps {
    .ant-steps-item-finish .ant-steps-item-icon {
      border-color: ${color};
    }
    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
      color: ${color};
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
      background-color: ${color};
    }
    .ant-steps-item-process .ant-steps-item-icon {
      background-color: ${color};
      border-color: ${color};
    }
    .ant-steps-item-title {
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
