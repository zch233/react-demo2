import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';
import AliIcon from '../../components/AliIcon';
import { Link } from 'react-router-dom';

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
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 22px;
    .dangerButton {
      margin-left: 1em;
    }
  }
  .scanTips {
    font-size: 16px;
    margin: 1em 0;
  }
  .rightBar {
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
  width: 300px;
`;
const WechatPay: React.FC = () => {
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
              <div className={'scanTips'}>距离距离二维码过期还剩 25:52 秒，过期后请刷新页面重新获取二维码</div>
              <Qrcode></Qrcode>
              <div className={'bottomTips'}>
                <AliIcon icon={'scan'} />
                <div>
                  <p>请使用微信扫一扫</p>
                  <p>扫描二维码支付</p>
                </div>
              </div>
            </div>
            <div className={'rightBar'}>
              <img width={'100%'} src={require('../../assert/order/wechatPhone.png')} alt="" />
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
