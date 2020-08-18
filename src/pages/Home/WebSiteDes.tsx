import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import AliIcon from '../../components/AliIcon';

const Wrapper = styled.section`
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
const AdvanceList = styled.article`
  display: flex;
`;
const AdvanceListItem = styled.div`
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
const advanceList = [
  {
    icon: 'advance1',
    title: '服务',
    des: '专注服务于知识产权领域',
  },
  {
    icon: 'advance2',
    title: '售后',
    des: '7×8小时售后支持',
  },
  {
    icon: 'advance3',
    title: '专心',
    des: '一对一专属客户经理',
  },
  {
    icon: 'advance4',
    title: '真实',
    des: '值得信赖的交易平台',
  },
];
const WebSiteDes: React.FC = () => {
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <div className={'des'}>
        <p>为什么选择</p>
        <h2>第九区知产？</h2>
        <Button>了解更多</Button>
      </div>
      <AdvanceList>
        {advanceList.map((advance) => (
          <AdvanceListItem>
            <AliIcon icon={advance.icon} />
            <p className={'advance-title'}>{advance.title}</p>
            <em className={'advance-des'}>{advance.des}</em>
          </AdvanceListItem>
        ))}
      </AdvanceList>
    </Wrapper>
  );
};
export default WebSiteDes;
