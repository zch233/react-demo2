import React, { useCallback, useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { Pagination, Spin } from 'antd';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import * as api from './api';
import queryString from 'query-string';

const PaginationWrapper = styled.section`
  text-align: center;
  margin: 15px 0;
`;
const Order: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const getOrders = useCallback(async (fetchData: api.GetOrders) => {
    setLoading(true);
    const { data } = await api.getOrders({ ...fetchData }).finally(() => setLoading(false));
    setOrders(data.list);
    setTotal(data.totalPages);
    setPageSize(data.size);
    setCurrent(data.no);
  }, []);
  const changeOrderStatus = useCallback(
    (order: Order) => {
      const current = orders.find((item) => item.orderNo === order.orderNo);
      current!.status = order.status;
      setOrders([...orders]);
    },
    [orders]
  );
  useEffect(() => {
    getOrders(queryString.parse(location.search));
  }, [getOrders, pageKey, location]);
  if (loading) return <Spin tip="Loading..." />;
  return (
    <>
      {orders.map((order) => (
        <OrderItem key={order.orderNo} order={order} changeOrderStatus={(order) => changeOrderStatus(order)} refreshOrders={() => setPageKey(pageKey + 1)} />
      ))}
      <PaginationWrapper>
        <Pagination
          size="small"
          showSizeChanger
          showQuickJumper
          pageSize={pageSize}
          current={current}
          showTotal={(total) => `共 ${total} 件`}
          onChange={(page, pageSize) => history.push(`/user/order?no=${page}&size=${pageSize}`)}
          onShowSizeChange={(page, pageSize) => history.push(`/user/order?no=${page}&size=${pageSize}`)}
          total={total}
        />
      </PaginationWrapper>
    </>
  );
};

export default Order;
