import React, { useCallback, useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { Pagination, Spin } from 'antd';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import * as api from './api';
import queryString from 'query-string';
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const PaginationWrapper = styled.section`
  text-align: center;
  margin: 15px 0;
`;
const Order: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const getPreorders = useCallback(async (fetchData: api.GetPreorders) => {
    setLoading(true);
    const { data } = await api.getPreorders({ ...fetchData }).finally(() => setLoading(false));
    setPreorders(data.list);
    setTotal(data.totalPages);
    setPageSize(data.size);
    setCurrent(data.no);
  }, []);
  const changeOrderStatus = useCallback(
    (preorder: Preorder) => {
      const current = preorders.find((item) => item.orderNo === preorder.orderNo);
      current!.status = preorder.status;
      setPreorders([...preorders]);
    },
    [preorders]
  );
  useEffect(() => {
    getPreorders(queryString.parse(location.search));
  }, [getPreorders, location]);
  return (
    <Wrapper>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          {preorders.map((preorder) => (
            <OrderItem key={preorder.orderNo} preorder={preorder} changeOrderStatus={(preorder) => changeOrderStatus(preorder)} />
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
      )}
    </Wrapper>
  );
};

export default Order;
