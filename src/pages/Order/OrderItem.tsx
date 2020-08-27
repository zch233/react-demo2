import React, { useCallback } from 'react';
import { Button, message, Modal, Statistic } from 'antd';
import { Wrapper } from './OrderItemStyles';
import { Link } from 'react-router-dom';
import * as api from './api';
import { ORDER_STATUS } from '../../utils/dict';
import AliIcon from '../../components/AliIcon';

type Props = {
  order: Order;
  changeOrderStatus: (order: Order) => void;
  refreshOrders: () => void;
};
const OrderItem: React.FC<Props> = ({ order, changeOrderStatus, refreshOrders }) => {
  const deleteOrder = useCallback(
    (order: Order) => {
      Modal.confirm({
        centered: true,
        title: order.name,
        okType: 'danger',
        content: '确定要删除该订单吗？',
        onOk: async () => {
          const hide = message.loading('正在删除订单，请稍候...', 0);
          await api.deleteOrder(order).finally(() => hide());
          refreshOrders();
          message.success('删除成功！');
        },
      });
    },
    [refreshOrders]
  );
  const productOptions = useCallback(
    (order: Order) =>
      order.status === ORDER_STATUS.CREATED ? (
        <>
          <div className={'countDown'}>
            <AliIcon icon={'clock'} />
            <Statistic.Countdown
              onFinish={() => changeOrderStatus({ ...order, status: ORDER_STATUS.CLOSED })}
              value={Date.now() + 1000 * order.remainSecond}
              valueStyle={{ lineHeight: 1 }}
              format={'m分s秒'}
            />
          </div>
          <Button type={'primary'} size={'small'} className={'dangerButton'} block>
            去支付
          </Button>
        </>
      ) : (
        <p>{ORDER_STATUS.label[order.status]}</p>
      ),
    [changeOrderStatus]
  );
  return (
    <Wrapper>
      <div className={'topBar'}>
        <p className={'orderInfo'}>
          <time>{order.createTime}</time>
          <span>订单号：{order.orderNo}</span>
        </p>
        <p className={'orderShop'}>买家：{order.sellerShopName}</p>
        <p className={'orderManager'}>
          <label>{order.accountManagerName && <span>客户经理：{order.accountManagerName}</span>}</label>
          {order.accountManagerMobile && <span>电话：{order.accountManagerMobile}</span>}
        </p>
      </div>
      <div className={'bottomBar'}>
        <div className={'productInfo'}>
          <div className={'imageWrapper'}>
            <img width={'100%'} src={require('../../assert/patent/' + order.commodityCategory.slice(0, 1) + '.png')} alt="" />
          </div>
          <div className={'info'}>
            <p className={'title'}>
              <Link to={`/patent/${order.number}`}>{order.name}</Link>
            </p>
            <em>{order.number}</em>
          </div>
        </div>
        <div className={'productPrice'}>
          <p>原价：￥{order.price}</p>
          {order.discounts.map((discount) => (
            <p key={discount.price}>VIP会员折扣：-￥{discount.price}</p>
          ))}
          <p className={'result'}>
            实付：<em>￥{order.totalAmount}</em>
          </p>
        </div>
        <div className={'productStatus'} />
        <div className={'productOptions'}>
          {productOptions(order)}
          <Button size={'small'} className={'delete'} type="text" onClick={() => deleteOrder(order)}>
            删除订单
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderItem;
