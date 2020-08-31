import React, { useCallback } from 'react';
import { Button, message, Modal, Popover, Statistic } from 'antd';
import { PayRouteItem, Wrapper } from './OrderItemStyles';
import { Link } from 'react-router-dom';
import * as api from './api';
import { ORDER_STATUS, PAY_ROUTES, TYPE_PAY_ROUTES } from '../../utils/dict';
import AliIcon from '../../components/AliIcon';
import { openNewWidowWithHTML } from '../../utils';
import { useHistory } from 'react-router-dom';

type Props = {
  order: Order;
  changeOrderStatus: (order: Order) => void;
  refreshOrders: () => void;
};
const OrderItem: React.FC<Props> = ({ order, changeOrderStatus, refreshOrders }) => {
  const history = useHistory();
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
  const cancelOrder = useCallback(
    (order: Order) => {
      Modal.confirm({
        centered: true,
        title: order.name,
        okType: 'danger',
        content: '确定要取消该订单吗？',
        onOk: async () => {
          const hide = message.loading('正在取消订单，请稍候...', 0);
          await api.cancelOrder(order).finally(() => hide());
          refreshOrders();
          message.success('取消成功！');
        },
      });
    },
    [refreshOrders]
  );
  const payOrder = useCallback(
    async (order: Order, payRoute: TYPE_PAY_ROUTES[number]) => {
      if (payRoute.payRoute === 'WXPAY') {
        history.push(`/order/pay/wechat?orderNo=${order.orderNo}`);
      } else {
        const { data } = await api.payOrder({ payRoute: payRoute.payRoute, orderNo: order.orderNo, tradeType: payRoute.tradeType });
        openNewWidowWithHTML(data);
      }
    },
    [history]
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
          <Popover
            placement={'bottom'}
            content={PAY_ROUTES.map((payRoute) => (
              <PayRouteItem onClick={() => payOrder(order, payRoute)} key={payRoute.label} className={'payRouteItem'}>
                <AliIcon icon={payRoute.icon} />
                <div>
                  <em className={'label'}>{payRoute.label}</em>
                  <p className={'description'}>{payRoute.description}</p>
                </div>
              </PayRouteItem>
            ))}
            title="请选择支付方式"
          >
            <Button type={'primary'} size={'small'} className={'dangerButton'} block>
              去支付
            </Button>
          </Popover>
          <Button size={'small'} className={'orderButton cancel'} type="text" onClick={() => cancelOrder(order)}>
            取消订单
          </Button>
        </>
      ) : (
        <>
          <p>{ORDER_STATUS.label[order.status]}</p>
          <Button size={'small'} className={'orderButton delete'} type="text" onClick={() => deleteOrder(order)}>
            删除订单
          </Button>
        </>
      ),
    [changeOrderStatus, deleteOrder, cancelOrder, payOrder]
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
        <div className={'productOptions'}>{productOptions(order)}</div>
      </div>
    </Wrapper>
  );
};

export default OrderItem;
