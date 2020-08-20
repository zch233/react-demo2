import React from 'react';
import { Card } from 'antd';
import { Wrapper } from './RemarkCardStyles';
import TextArea from 'antd/es/input/TextArea';

const RemarkCard: React.FC = () => {
  return (
    <Wrapper>
      <Card title="给买家留言">
        <TextArea placeholder={'请输入内容'} rows={2} />
      </Card>
    </Wrapper>
  );
};

export default RemarkCard;
