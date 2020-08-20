import React from 'react';
import { Button, Card } from 'antd';
import { Wrapper } from './PayCardStyles';
import AliIcon from '../../components/AliIcon';

const payRoutes = [
  {
    icon: 'unionPay',
    label: '在线支付',
    description: '欢迎使用银联支付',
  },
  {
    icon: 'aliPay',
    label: '支付宝',
    description: '数亿用户都用，安全可托付',
  },
  {
    icon: 'wechatPay',
    label: '微信',
    description: '微信，是一种生活方式',
  },
];
const PayCard: React.FC = () => {
  return (
    <Wrapper>
      <Card title="订单金额" className={'myCard'}>
        <p className={'price priceNormal'}>
          <label className={'label'}>原价</label>
          <em>￥20000.00</em>
        </p>
        <p className={'price priceResult'}>
          <label className={'label'}>实付款</label>
          <em>￥20000.00</em>
        </p>
        <div className={'payRoute'}>
          {payRoutes.map((payRoute) => (
            <label className={'payRoute-item'}>
              <AliIcon className={'payRoute-item-icon'} icon={payRoute.icon}></AliIcon>
              <div className="payRoute-item-info">
                <label>{payRoute.label}</label>
                <p>{payRoute.description}</p>
              </div>
              <div className={'payRoute-item-radio active'}>
                <AliIcon icon={'tick'}></AliIcon>
              </div>
            </label>
          ))}
        </div>
        <div className={'payButton'}>
          <Button className={'button canBuy'} size={'large'} type="primary" block>
            立即购买
          </Button>
        </div>
      </Card>
    </Wrapper>
  );
};

export default PayCard;
