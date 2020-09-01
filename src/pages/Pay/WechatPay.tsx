import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, message, Modal, Result as AntdResult, Spin } from 'antd';
import AliIcon from '../../components/AliIcon';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Countdown from 'antd/es/statistic/Countdown';
import { payOrder, payVipOrder } from '../Order/api';
import * as api from './api';
import * as queryString from 'query-string';
import { ORDER_PAY_STATUS } from '../../utils/dict';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.section`
  padding: 20px 0;
  background-color: #fff;
  .orderInfo {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .price {
      font-size: 20px;
      color: #ac2925;
    }
  }
  .mainCard {
    display: flex;
    justify-content: center;
  }
  .title {
    font-size: 22px;
    .dangerButton {
      margin-left: 1em;
    }
  }
  .scanTips {
    font-size: 12px;
    display: flex;
    align-items: center;
    .ant-statistic-content {
      font-size: 15px;
      color: #ac2925;
      line-height: 1;
      font-weight: bold;
    }
  }
  .rightBar {
    padding-top: 1.5em;
    margin-left: 3em;
  }
  .bottomTips {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff7674;
    color: #fff;
    padding: 8px;
    p {
      margin: 0;
      line-height: 1.6;
    }
    svg {
      font-size: 40px;
      margin-right: 0.4em;
    }
  }
  .return {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin: 3em 0 1em;
    svg {
      font-size: 20px;
      margin-right: 0.6em;
    }
  }
`;
const Qrcode = styled.div`
  border: 1px solid #ddd;
  width: 340px;
  margin: 20px auto;
  &.codeExpired {
    filter: blur(10px);
  }
`;
const Result = styled.div`
  padding: 37px 0;
`;
const WechatPay: React.FC = () => {
  const history = useHistory();
  const timer = useRef(0);
  const [loading, setLoading] = useState(false);
  const [qrcode, setWechatPayQrcode] = useState('');
  const [confirmButtonVisible, setConfirmButtonVisible] = useState(false);
  const [codeExpired, setCodeExpired] = useState(false);
  const [pageStatus, setPageStatus] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });
  const [orderInfo, setOrderInfo] = useState<Partial<OrderResult>>({});
  const params = useMemo(() => queryString.parse(window.location.search) as { orderNo: string; type: string }, []);
  const generatorQrcode = useCallback((text: string) => {
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin: 1 }, (err, url) => {
      if (err) {
        message.error('生成二维码失败！');
        setCodeExpired(true);
        return;
      }
      setWechatPayQrcode(url);
    });
  }, []);
  const getPayResult = useCallback(async (tradeNo) => {
    const { data } = await api.getPayResult(tradeNo);
    return data.tradeStatus;
  }, []);
  const pollGetPayResult = useCallback(
    async (tradeNo, askPayResultTimes) => {
      const result = await getPayResult(tradeNo);
      if (result === ORDER_PAY_STATUS.WAIT_BUYER_PAY) {
        if (askPayResultTimes > 6) {
          setConfirmButtonVisible(true);
          return;
        }
        timer.current = setTimeout(() => pollGetPayResult(tradeNo, askPayResultTimes + 1), 3000);
      } else if (result === ORDER_PAY_STATUS.TRADE_SUCCESS || result === ORDER_PAY_STATUS.TRADE_FINISHED) {
        history.push(`/order/pay/result?orderNo=${params.orderNo}&out_trade_no=${tradeNo}`);
      } else if (result === ORDER_PAY_STATUS.TRADE_CLOSED) {
        setPageStatus({ visible: true, msg: '订单已关闭' });
      }
    },
    [getPayResult, history, params]
  );
  const getWechatPayQrCode = useCallback(() => {
    setLoading(true);
    (params.type === 'PATENT' ? payOrder : payVipOrder)({
      orderNo: params.orderNo,
      payRoute: 'WXPAY',
      tradeType: 'NATIVE',
    })
      .then(({ data }) => {
        setOrderInfo(data);
        generatorQrcode(data.codeUrl);
        timer.current = setTimeout(() => pollGetPayResult(data.tradeNo, 0), 5000);
      })
      .catch((error) => setPageStatus({ visible: true, msg: error.msg }))
      .finally(() => setLoading(false));
  }, [generatorQrcode, pollGetPayResult, params]);
  const confirmPay = useCallback(async () => {
    const result = await getPayResult(orderInfo.tradeNo);
    if (result === ORDER_PAY_STATUS.WAIT_BUYER_PAY) {
      Modal.error({ title: '您的订单尚未完成支付', content: '请检查您的支付信息' });
    } else if (result === ORDER_PAY_STATUS.TRADE_SUCCESS || result === ORDER_PAY_STATUS.TRADE_FINISHED) {
      history.push(`/order/pay/result?orderNo=${orderInfo.orderNo}&out_trade_no=${orderInfo.tradeNo}`);
    } else if (result === ORDER_PAY_STATUS.TRADE_CLOSED) {
      Modal.error({ title: '您的订单已关闭' });
    }
  }, [orderInfo, getPayResult, history]);
  useEffect(() => {
    getWechatPayQrCode();
    return () => {
      clearTimeout(timer.current);
    };
  }, [getWechatPayQrCode]);
  return (
    <Wrapper>
      <Spin spinning={loading}>
        {pageStatus.visible ? (
          <Result className={'pageWidthWithCenter'}>
            <AntdResult
              status="error"
              title={pageStatus.msg}
              extra={[
                <Link to={'/user/order'} key="myOrder">
                  <Button type="primary">我的订单</Button>
                </Link>,
                <Link to={'/patent'} key="buy">
                  <Button>随便看看</Button>
                </Link>,
              ]}
            />
          </Result>
        ) : (
          <div className={'pageWidthWithCenter'}>
            <p className={'orderInfo'}>
              <span>订单提交成功，请尽快付款！订单号：{orderInfo.orderNo}</span>
              <span>
                应付金额<em className={'price'}> {orderInfo.totalAmount} </em>元
              </span>
            </p>
            <Card>
              <h1 className={'title'}>
                微信支付
                {confirmButtonVisible && (
                  <Button size={'small'} type={'primary'} className={'dangerButton'} onClick={confirmPay}>
                    我已完成支付
                  </Button>
                )}
              </h1>
              <div className={'mainCard'}>
                <div className={'leftBar'}>
                  {codeExpired ? (
                    <Link to={'/patent'}>
                      <Button type={'primary'} size={'small'}>
                        订单已关闭，您还可以再挑一件
                      </Button>
                    </Link>
                  ) : (
                    <div className={'scanTips'}>
                      距离距离订单失效还剩
                      <Countdown
                        value={Date.now() + (orderInfo.timeRemainingSec ? orderInfo.timeRemainingSec * 1000 : 0)}
                        onFinish={() => setCodeExpired(true)}
                        format={'m分s秒'}
                      />
                      ，过期后请重新下单
                    </div>
                  )}
                  <Qrcode className={codeExpired ? 'codeExpired' : ''}>
                    <img src={qrcode} width={'100%'} alt="" />
                  </Qrcode>
                  <div className={'bottomTips'}>
                    <AliIcon icon={'scan'} />
                    <div>
                      <p>请使用微信扫一扫</p>
                      <p>扫描二维码支付</p>
                    </div>
                  </div>
                </div>
                <div className={'rightBar'}>
                  <img height={'100%'} src={require('../../assert/order/wechatPhone.png')} alt="" />
                </div>
              </div>
              <Link to={'/user/order'} className={'return'}>
                <AliIcon icon={'left'} />
                <span>选择其他支付方式</span>
              </Link>
            </Card>
          </div>
        )}
      </Spin>
    </Wrapper>
  );
};

export default WechatPay;
