import React, { useCallback, useContext, useState } from 'react';
import { Button, Card, Modal, Skeleton } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Wrapper } from './PayCardStyles';
import AliIcon from '../../components/AliIcon';
import { OrderConfirmContext } from './index';
import * as api from './api';
import { PAY_ROUTES, TYPE_PAY_ROUTES } from '../../utils/dict';
import { openNewWidowWithHTML } from '../../utils';
import { useHistory } from 'react-router-dom';

const PayCard: React.FC = () => {
  const history = useHistory();
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
      openNewWidowWithHTML(data);
      Modal.confirm({
        title: '请在新打开的页面上完成付款',
        icon: <ExclamationCircleOutlined />,
        content: '付款完成前请不要关闭此窗口',
        cancelText: '选择其他',
        okText: '已完成支付',
        okButtonProps: { danger: true },
        onOk() {
          history.push('/user/order');
        },
      });
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
    </Wrapper>
  );
};

export default PayCard;
