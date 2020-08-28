import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api/base';
import { StoreContext } from '../../../index';

const Wrapper = styled.section`
  width: 200px;
  .userCenter {
    margin-bottom: 10px;
  }
`;
type Props = {
  setPopoverVisible: (value: boolean) => void;
};
const UserDialog: React.FC<Props> = ({ setPopoverVisible }) => {
  const history = useHistory();
  const { dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const goToUser = useCallback(() => {
    history.push('/user/order');
    setPopoverVisible(false);
  }, [history, setPopoverVisible]);
  const logout = useCallback(async () => {
    setLoading(true);
    await api.logout().finally(() => setLoading(false));
    message.success('退出成功！');
    history.push('/');
    dispatch({ type: 'setUser', payload: {} });
  }, [setLoading, history, dispatch]);
  return (
    <Wrapper>
      <Button block type={'primary'} className={'userCenter'} onClick={goToUser}>
        会员中心
      </Button>
      <Button loading={loading} block type={'primary'} className={'dangerButton'} onClick={logout}>
        退出
      </Button>
    </Wrapper>
  );
};

export default UserDialog;
