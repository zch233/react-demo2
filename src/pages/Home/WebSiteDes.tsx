import React, { useCallback } from 'react';
import { Button, Modal } from 'antd';
import AliIcon from '../../components/AliIcon';
import { AdvanceList, AdvanceListItem, Wrapper } from './WebSiteDesStyles';

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
  const leanMore = useCallback(() => {
    Modal.info({
      title: '欢迎了解第九区',
      content: '买专利就上第九区产权,专业的专利交易平台，提供众多专利买卖，专利转让和专利交易信息，专业顾问一对一助力企业复工复产，让您轻松低价买专利。',
    });
  }, []);
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <div className={'des'}>
        <p>为什么选择</p>
        <h2>第九区知产？</h2>
        <Button onClick={leanMore}>了解更多</Button>
      </div>
      <AdvanceList>
        {advanceList.map((advance) => (
          <AdvanceListItem key={advance.icon}>
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
