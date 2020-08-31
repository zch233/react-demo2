import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, message, Result } from 'antd';
import AliIcon from '../../components/AliIcon';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Countdown from 'antd/es/statistic/Countdown';
import { payOrder } from '../Order/api';
import * as api from './api';
import * as queryString from 'query-string';
import { ORDER_PAY_STATUS } from '../../utils/dict';

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
const WechatPay: React.FC = () => {
  const askPayResultTimes = useRef(0);
  const [qrcode, setWechatPayQrcode] = useState('');
  const [codeExpired, setCodeExpired] = useState(false);
  const [pageStatus, setPageStatus] = useState<{ visible: boolean; msg: string; status: 'success' | 'error' }>({ visible: false, msg: '', status: 'success' });
  const [orderInfo, setOrderInfo] = useState<Partial<OrderResult>>({});
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
    if (data === ORDER_PAY_STATUS.WAIT_BUYER_PAY) {
      if (askPayResultTimes.current > 6) return;
      askPayResultTimes.current += 1;
      setTimeout(() => getPayResult(tradeNo), 3000);
    } else if (data === ORDER_PAY_STATUS.TRADE_SUCCESS || data === ORDER_PAY_STATUS.TRADE_FINISHED) {
      setPageStatus({ visible: true, msg: '订单支付成功', status: 'success' });
    } else if (data === ORDER_PAY_STATUS.TRADE_CLOSED) {
      setPageStatus({ visible: true, msg: '订单已关闭', status: 'error' });
    }
  }, []);
  const getWechatPayQrCode = useCallback(async () => {
    const params = queryString.parse(window.location.search) as { orderNo: string };
    payOrder({
      orderNo: params.orderNo,
      payRoute: 'WXPAY',
      tradeType: 'NATIVE',
    })
      .then(({ data }) => {
        setOrderInfo(data);
        generatorQrcode(data.codeUrl);
        setTimeout(() => getPayResult(data.tradeNo), 5000);
      })
      .catch((error) => setPageStatus({ visible: true, status: 'error', msg: error.msg }));
  }, [generatorQrcode, getPayResult]);
  useEffect(() => {
    getWechatPayQrCode();
  }, [getWechatPayQrCode]);
  return (
    <Wrapper>
      {pageStatus.visible ? (
        <Result
          status={pageStatus.status}
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
              <Button size={'small'} type={'primary'} className={'dangerButton'}>
                我已完成支付
              </Button>
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
    </Wrapper>
  );
};

export default WechatPay;
