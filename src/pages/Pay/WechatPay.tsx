import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, message } from 'antd';
import AliIcon from '../../components/AliIcon';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Countdown from 'antd/es/statistic/Countdown';

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
      font-size: 50px;
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
  const [qrcode, setWechatPayQrcode] = useState('');
  const [codeExpired, setCodeExpired] = useState(false);
  const generatorQrcode = useCallback((text: string) => {
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin: 1 }, (err, url) => {
      if (err) {
        message.error('生成二维码失败！');
        return;
      }
      setWechatPayQrcode(url);
    });
  }, []);
  const getWechatPayQrCode = useCallback(async () => {
    generatorQrcode('http://www.baidu.com');
  }, [generatorQrcode]);
  useEffect(() => {
    getWechatPayQrCode();
  }, [getWechatPayQrCode]);
  return (
    <Wrapper>
      <div className={'pageWidthWithCenter'}>
        <p className={'orderInfo'}>
          <span>订单提交成功，请尽快付款！订单号：131495766085</span>
          <span>
            应付金额<em className={'price'}> 8068.00 </em>元
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
                <Button type={'primary'} size={'small'}>
                  重新获取二维码
                </Button>
              ) : (
                <div className={'scanTips'}>
                  距离距离二维码过期还剩 <Countdown value={Date.now() + 1000 * 60 * 30} onFinish={() => setCodeExpired(true)} format={'m分s秒'} />
                  ，过期后请重新获取二维码
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
    </Wrapper>
  );
};

export default WechatPay;
