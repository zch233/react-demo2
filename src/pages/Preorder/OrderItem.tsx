import React, { useCallback } from 'react';
import { Button, message, Modal } from 'antd';
import { Wrapper } from './OrderItemStyles';
import { Link } from 'react-router-dom';
import { PREORDER_STATUS } from '../../utils/dict';
import * as api from './api';

type Props = {
  preorder: Preorder;
  changeOrderStatus: (order: Preorder) => void;
};
const OrderItem: React.FC<Props> = ({ preorder, changeOrderStatus }) => {
  const cancelPreorder = useCallback(
    (preorder: Preorder) => {
      Modal.confirm({
        centered: true,
        title: preorder.productName,
        okType: 'danger',
        content: '确定要取消该预留吗？',
        onOk: async () => {
          const hide = message.loading('正在取消预留，请稍候...', 0);
          await api.cancelPreorder({ reserveProductId: preorder.productId }).finally(() => hide());
          changeOrderStatus(preorder);
          message.success('取消成功！');
        },
      });
    },
    [changeOrderStatus]
  );
  return (
    <Wrapper>
      <div className={'topBar'}>
        <p className={'orderInfo'}>
          <time>{preorder.createTime}</time>
          {preorder.orderNo && <span>订单号：{preorder.orderNo}</span>}
        </p>
        <p className={'orderShop'}>买家：{preorder.sellerShopName}</p>
        <p className={'orderManager'}>
          <label>{preorder.accountManagerName && <span>客户经理：{preorder.accountManagerName}</span>}</label>
          {preorder.accountManagerMobile && <span>电话：{preorder.accountManagerMobile}</span>}
        </p>
      </div>
      <div className={'bottomBar'}>
        <div className={'productInfo'}>
          <div className={'imageWrapper'}>
            <img width={'100%'} src={require('../../assert/patent/' + (preorder.productCategory || 'A').slice(0, 1) + '.png')} alt="" />
          </div>
          <div className={'info'}>
            <p className={'title'}>
              <Link to={`/patent/${preorder.productNumber}`}>{preorder.productName}</Link>
            </p>
            <em>{preorder.productNumber}</em>
          </div>
        </div>
        <div className={'productPrice'}>
          <p>价格：￥{preorder.productPrice}</p>
        </div>
        <div className={'productStatus'}>
          <p>{PREORDER_STATUS.label[preorder.status]}</p>
        </div>
        <div className={'productOptions'}>
          {preorder.status === PREORDER_STATUS.CREATED && (
            <>
              <Button type={'primary'} size={'small'} className={'dangerButton'} block>
                去下单
              </Button>
              <Button size={'small'} className={'delete'} type="text" onClick={() => cancelPreorder(preorder)}>
                取消预留
              </Button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderItem;
