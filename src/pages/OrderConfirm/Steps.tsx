import React from 'react';
import { Wrapper } from './StepsStyles';
import { Steps as AntSteps } from 'antd';

const Steps: React.FC = () => {
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <AntSteps className={'steps'} labelPlacement={'vertical'}>
        <AntSteps.Step title="确认信息" />
        <AntSteps.Step title="付款到平台" />
        <AntSteps.Step title="确认收货" />
      </AntSteps>
    </Wrapper>
  );
};

export default Steps;
