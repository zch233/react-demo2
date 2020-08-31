import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, Card, Skeleton } from 'antd';
import { Wrapper } from './PayCardStyles';
import AliIcon from '../../components/AliIcon';
import { OrderConfirmContext } from './index';
import * as api from './api';
import { PAY_ROUTES, TYPE_PAY_ROUTES } from '../../utils/dict';
import { openNewWidowWithHTML } from '../../utils';
import { useHistory } from 'react-router-dom';
import PollGetPayResultModal from '../../components/PollGetPayResultModal';

const PayCard: React.FC = () => {
  const history = useHistory();
  const payResultParams = useRef({ tradeNo: '', orderNo: '' });
  const [payResultVisible, setPayResultVisible] = useState(false);
  const [currentPay, setCurrentPay] = useState<TYPE_PAY_ROUTES[number]>(PAY_ROUTES[0]);
  const { loading, orderConfirm } = useContext(OrderConfirmContext);
  const handleBuyClick = useCallback(async () => {
    const { data } = await api.payOrder({
      commodityId: orderConfirm.id as string,
      commodityType: 'PATENT',
      payRoute: currentPay.payRoute,
      tradeType: currentPay.tradeType,
    });
    if (currentPay.payRoute === 'WXPAY') {
      history.push(`/order/pay/wechat?orderNo=${data.orderNo}`);
    } else {
      openNewWidowWithHTML(data.form);
      payResultParams.current = { tradeNo: data.tradeNo, orderNo: data.orderNo };
      setPayResultVisible(true);
    }
  }, [orderConfirm, currentPay, history]);
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
            {PAY_ROUTES.map((payRoute) => (
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
      <PollGetPayResultModal params={payResultParams.current} visible={payResultVisible} setVisible={(visible) => setPayResultVisible(visible)} />
    </Wrapper>
  );
};

export default PayCard;
