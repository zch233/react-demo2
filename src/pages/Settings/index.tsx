import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';
import UpdateUserInfoModal from './UpdateUserInfoModal';
import UpdateAddressModal from './UpdateAddressModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import { StoreContext } from '../../index';

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
  const { state, dispatch } = useContext(StoreContext);
  const [updateUserInfoModalVisible, setUpdateUserInfoModalVisible] = useState(false);
  const [updateAddressModalVisible, setUpdateAddressModalVisible] = useState(false);
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
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
            <span>{state.user.account}</span>
          </p>
          <p>
            <label className={'label'}>会员名称</label>
            <span>{state.user.nickname}</span>
          </p>
          <p>
            <label className={'label'}>会员身份</label>
            <span>{state.user.hasVip ? 'VIP年费会员' : '普通会员'}</span>
          </p>
        </Card>
      </Article>
      <Article className={'security'}>
        <Card title="安全中心">
          <p>
            <label className={'label'}>登录密码</label>
            <Button className={'updatePassword'} type={'text'} onClick={() => setUpdatePasswordModalVisible(true)}>
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
        <Card
          title="收件地址"
          extra={
            <Button type={'link'} onClick={() => setUpdateAddressModalVisible(true)}>
              添加
            </Button>
          }
        />
      </Article>
      <UpdateUserInfoModal
        visible={updateUserInfoModalVisible}
        setVisible={(visible) => setUpdateUserInfoModalVisible(visible)}
        onSuccess={(response) => dispatch({ type: 'setUser', payload: response.data })}
      />
      <UpdateAddressModal visible={updateAddressModalVisible} setVisible={(visible) => setUpdateAddressModalVisible(visible)} />
      <UpdatePasswordModal visible={updatePasswordModalVisible} setVisible={(visible) => setUpdatePasswordModalVisible(visible)} />
    </Wrapper>
  );
};

export default Settings;
