import React from 'react';
import OrderItem from './OrderItem';
import { ConfigProvider, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const Order: React.FC = () => {
  return (
    <>
      <OrderItem />
      <ConfigProvider locale={zhCN}>
        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
      </ConfigProvider>
    </>
  );
};

export default Order;
