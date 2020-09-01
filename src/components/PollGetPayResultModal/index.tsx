import React, { useCallback, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { AxiosResponse } from 'axios';
import AliIcon from '../AliIcon';
import styled from 'styled-components';
import * as api from '../../pages/Pay/api';
import { ORDER_PAY_STATUS } from '../../utils/dict';
import { useHistory } from 'react-router-dom';

type Props = {
  visible: boolean;
  setVisible: (setVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: (data: AxiosResponse) => void;
  params?: any;
};
const Wrapper = styled.div`
  display: flex;
  .icon {
    font-size: 50px;
    color: #faad14;
  }
  .description {
    margin-left: 2em;
    &-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 1em;
    }
  }
`;
const PollGetPayResultModal: React.FC<Props> = ({ visible, onCancel, onSuccess, setVisible, params }) => {
  const history = useHistory();
  const timer = useRef(0);
  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancel && onCancel();
  }, [setVisible, onCancel]);
  const getPayResult = useCallback(async (tradeNo) => {
    const { data } = await api.getPayResult(tradeNo);
    return data.tradeStatus;
  }, []);
  const pollGetPayResult = useCallback(
    async (askPayResultTimes = 0) => {
      const result = await getPayResult(params.tradeNo);
      if (result === ORDER_PAY_STATUS.WAIT_BUYER_PAY) {
        if (askPayResultTimes > 6) return;
        timer.current = setTimeout(() => pollGetPayResult(askPayResultTimes + 1), 3000);
      } else if (result === ORDER_PAY_STATUS.TRADE_SUCCESS || result === ORDER_PAY_STATUS.TRADE_FINISHED) {
        history.push(`/order/pay/result?orderNo=${params.orderNo}&out_trade_no=${params.tradeNo}`);
      } else if (result === ORDER_PAY_STATUS.TRADE_CLOSED) {
        Modal.error({ title: '您的订单已关闭' });
      }
    },
    [getPayResult, history, params]
  );
  const handleOk = useCallback(async () => {
    const result = await getPayResult(params.tradeNo);
    if (result === ORDER_PAY_STATUS.WAIT_BUYER_PAY) {
      Modal.error({ title: '您的订单尚未完成支付', content: '请检查您的支付信息' });
    } else if (result === ORDER_PAY_STATUS.TRADE_SUCCESS || result === ORDER_PAY_STATUS.TRADE_FINISHED) {
      history.push(`/order/pay/result?orderNo=${params.orderNo}&out_trade_no=${params.tradeNo}`);
    } else if (result === ORDER_PAY_STATUS.TRADE_CLOSED) {
      Modal.error({ title: '您的订单已关闭' });
    }
    onSuccess && onSuccess(result);
  }, [history, onSuccess, params, getPayResult]);
  useEffect(() => {
    if (visible) timer.current = setTimeout(pollGetPayResult, 5000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [pollGetPayResult, visible]);
  return (
    <Modal
      title="我要付款"
      maskClosable={false}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText={'选择其他方式'}
      okText={'已完成支付'}
      okButtonProps={{ danger: true }}
    >
      <Wrapper>
        <AliIcon className={'icon'} icon={'warning1'} />
        <div className={'description'}>
          <h4 className={'description-title'}>请您在新打开的页面上完成付款！</h4>
          <p>完成付款前请不要关闭此窗口。</p>
          <p>完成付款后请根据实际情况点击下面的按钮。</p>
        </div>
      </Wrapper>
    </Modal>
  );
};

export default PollGetPayResultModal;
