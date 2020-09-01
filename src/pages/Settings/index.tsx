import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, message, Modal } from 'antd';
import UpdateUserInfoModal from './UpdateUserInfoModal';
import UpdateAddressModal from './UpdateAddressModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import * as api from './api';
import AliIcon from '../../components/AliIcon';
import { StoreContext } from '../../store';

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
  &.address {
    .addressItem {
      display: flex;
      align-items: center;
    }
    .addressOptionIcon {
      color: #23527c;
      margin: 0 0.3em;
      cursor: pointer;
    }
  }
`;
const Settings: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [updateUserInfoModalVisible, setUpdateUserInfoModalVisible] = useState(false);
  const [updateAddressModalVisible, setUpdateAddressModalVisible] = useState(false);
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({});
  const getAddresses = useCallback(async () => {
    const { data } = await api.getAddresses();
    setAddresses(data);
  }, []);
  const deleteAddress = useCallback(
    async (address: Address) => {
      Modal.confirm({
        centered: true,
        title: '确定要删除该地址吗？',
        okType: 'danger',
        onOk: async () => {
          const hide = message.loading('正在删除，请稍候...', 0);
          await api.deleteAddress(address).finally(() => hide());
          setAddresses(addresses.filter((item) => item.id !== address.id));
          message.success('删除成功！');
        },
      });
    },
    [addresses]
  );
  useEffect(() => {
    getAddresses();
  }, [getAddresses]);
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
            <Button
              type={'link'}
              onClick={() => {
                setCurrentAddress({});
                setUpdateAddressModalVisible(true);
              }}
            >
              添加
            </Button>
          }
        >
          {addresses.map((address) => (
            <p key={address.id} className={'addressItem'}>
              {address.name}--{address.phone}--{address.detail}
              <span
                onClick={() => {
                  setCurrentAddress(address);
                  setUpdateAddressModalVisible(true);
                }}
              >
                <AliIcon className={'addressOptionIcon'} icon={'edit'} />
              </span>
              <span onClick={() => deleteAddress(address)}>
                <AliIcon className={'addressOptionIcon'} icon={'delete'} />
              </span>
            </p>
          ))}
        </Card>
      </Article>
      <UpdateUserInfoModal
        visible={updateUserInfoModalVisible}
        setVisible={(visible) => setUpdateUserInfoModalVisible(visible)}
        onSuccess={(response) => dispatch({ type: 'setUser', payload: response.data })}
      />
      <UpdateAddressModal
        params={{ address: currentAddress }}
        visible={updateAddressModalVisible}
        onSuccess={getAddresses}
        setVisible={(visible) => setUpdateAddressModalVisible(visible)}
      />
      <UpdatePasswordModal visible={updatePasswordModalVisible} setVisible={(visible) => setUpdatePasswordModalVisible(visible)} />
    </Wrapper>
  );
};

export default Settings;
