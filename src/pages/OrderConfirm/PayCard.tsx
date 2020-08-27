import React, { useCallback, useContext, useState } from 'react';
import { Button, Card, Skeleton } from 'antd';
import { Wrapper } from './PayCardStyles';
import AliIcon from '../../components/AliIcon';
import { OrderConfirmContext } from './index';
import * as api from './api';

const payRoutes = [
  {
    icon: 'unionPay',
    label: '在线支付',
    description: '欢迎使用银联支付',
    payRoute: 'UNION_PAY',
    tradeType: 'WEB',
  },
  {
    icon: 'aliPay',
    label: '支付宝',
    description: '数亿用户都用，安全可托付',
    payRoute: 'ALIPAY',
    tradeType: 'WEB',
  },
  {
    icon: 'wechatPay',
    label: '微信',
    description: '微信，是一种生活方式',
    payRoute: 'WXPAY',
    tradeType: 'NATIVE',
  },
];
type PayRoute = {
  icon: string;
  label: string;
  description: string;
  payRoute: string;
  tradeType: string;
};
const PayCard: React.FC = () => {
  const [currentPay, setCurrentPay] = useState<PayRoute>(payRoutes[0]);
  const { loading, orderConfirm } = useContext(OrderConfirmContext);
  const handleBuyClick = useCallback(async () => {
    const { data } = await api.payOrder({
      // @ts-ignore
      commodityId: orderConfirm.id,
      commodityType: 'PATENT',
      payRoute: currentPay.payRoute,
      tradeType: currentPay.tradeType,
    });
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(new Blob([data], { type: 'text/html' }));
    anchor.target = '_blank';
    anchor.click();
  }, [orderConfirm, currentPay]);
  return (
    <Wrapper>
      <Card title="订单金额" className={'myCard'}>
        <Skeleton active paragraph={{ rows: 10 }} loading={loading}>
          <p className={'price priceNormal'}>
            <label className={'label'}>原价</label>
            <em>￥{orderConfirm?.price}</em>
          </p>
          {orderConfirm?.discounts?.map((discount) => (
            <p key={discount.price} className={'price priceDiscount'}>
              <label className={'label'}>会员</label>
              <em>-￥{discount.price}</em>
            </p>
          ))}
          <p className={'price priceResult'}>
            <label className={'label'}>实付款</label>
            <em>￥{orderConfirm?.totalAmount}</em>
          </p>
          <div className={'payRoute'}>
            {payRoutes.map((payRoute) => (
              <label key={payRoute.label} className={'payRoute-item'} onClick={() => setCurrentPay(payRoute)}>
                <AliIcon className={'payRoute-item-icon'} icon={payRoute.icon} />
                <div className="payRoute-item-info">
                  <label>{payRoute.label}</label>
                  <p>{payRoute.description}</p>
                </div>
                <div className={`payRoute-item-radio ${currentPay.payRoute === payRoute.payRoute ? 'active' : ''}`}>
                  <AliIcon icon={'tick'} />
                </div>
              </label>
            ))}
          </div>
          <div className={'payButton'}>
            <Button className={'button canBuy'} size={'large'} type="primary" block onClick={handleBuyClick}>
              立即购买
            </Button>
          </div>
        </Skeleton>
      </Card>
    </Wrapper>
  );
};

export default PayCard;
