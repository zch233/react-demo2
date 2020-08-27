import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input, Modal } from 'antd';
import AliIcon from '../../components/AliIcon';
import UpdateUserInfoModal from './UpdateUserInfoModal';

const Wrapper = styled.section`
  p {
    color: #000;
  }
  .label {
    font-weight: bold;
    margin-right: 3em;
  }
`;
const Article = styled.article`
  margin-top: 15px;
  margin-bottom: 15px;
  &.info {
    .editName {
      cursor: pointer;
      margin-left: 0.4em;
      &:hover {
        color: #23527c;
      }
    }
  }
  &.security {
    .updatePassword {
      color: #23527c;
    }
  }
`;
const Settings: React.FC = () => {
  const [updateUserInfoModalVisible, setUpdateUserInfoModalVisible] = useState(false);
  return (
    <Wrapper>
      <Article className={'info'}>
        <Card
          title="基本信息"
          extra={
            <Button onClick={() => setUpdateUserInfoModalVisible(true)} type={'link'}>
              编辑
            </Button>
          }
        >
          <p>
            <label className={'label'}>会员账号</label>
            <span>15967137871</span>
          </p>
          <p>
            <label className={'label'}>会员名称</label>
            <span>会员_15967137871</span>
          </p>
          <p>
            <label className={'label'}>会员身份</label>
            <span>VIP年费会员</span>
          </p>
        </Card>
      </Article>
      <Article className={'security'}>
        <Card title="安全中心">
          <p>
            <label className={'label'}>登录密码</label>
            <Button className={'updatePassword'} type={'text'}>
              修改密码
            </Button>
          </p>
          <p>
            <label className={'label'}>微信登录</label>
            <Button type={'text'} disabled>
              绑定微信
            </Button>
          </p>
        </Card>
      </Article>
      <Article className={'address'}>
        <Card title="收件地址" extra={<Button type={'link'}>添加</Button>}></Card>
      </Article>
      <UpdateUserInfoModal
        visible={updateUserInfoModalVisible}
        onCancel={() => setUpdateUserInfoModalVisible(false)}
        onSuccess={() => setUpdateUserInfoModalVisible(false)}
      />
    </Wrapper>
  );
};

export default Settings;
