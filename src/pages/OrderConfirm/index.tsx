import React, { useCallback, useEffect, useState, createContext } from 'react';
import styled from 'styled-components';
import Steps from './Steps';
import PatentCard from './PatentCard';
import RemarkCard from './RemarkCard';
import PayCard from './PayCard';
import * as api from './api';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Result } from 'antd';

const Wrapper = styled.section`
  background-color: #f5f5f5;
  padding: 24px 0;
`;
const Main = styled.section`
  display: flex;
  margin-top: 15px;
  .leftBar {
    flex: 1;
    margin-right: 15px;
  }
  .rightBar {
    width: 30%;
  }
`;
type OrderConfirm = Partial<Patent & Shop & Pay>;
type Context = {
  loading: boolean;
  orderConfirm: OrderConfirm;
};
export const OrderConfirmContext = createContext<Context>({ loading: false, orderConfirm: {} });
const OrderConfirm: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState({
    error: false,
    result: '未知错误',
  });
  const [orderConfirm, setOrderConfirm] = useState<OrderConfirm>({});
  const getOrderConfirm = useCallback(async () => {
    const { commodityId } = queryString.parse(location.search) as { commodityId: string };
    setLoading(true);
    api
      .getOrderConfirm({
        commodityId,
        commodityType: 'PATENT',
      })
      .then(({ data }: { data: Patent & Shop }) => {
        setOrderConfirm(data);
      })
      .catch((err) => {
        err.code === 3200 && setPageError({ error: true, result: err.msg });
      })
      .finally(() => setLoading(false));
  }, [location]);
  useEffect(() => {
    getOrderConfirm();
  }, [getOrderConfirm]);
  return (
    <OrderConfirmContext.Provider value={{ loading, orderConfirm }}>
      <Wrapper>
        {pageError.error ? (
          <Result
            status="500"
            title="500"
            subTitle={`抱歉，${pageError.result}`}
            extra={
              <Link to={'/'}>
                <Button type="primary">返回首页</Button>
              </Link>
            }
          />
        ) : (
          <>
            <Steps />
            <Main className={'pageWidthWithCenter'}>
              <div className={'leftBar'}>
                <PatentCard />
                <RemarkCard />
              </div>
              <div className={'rightBar'}>
                <PayCard />
              </div>
            </Main>
          </>
        )}
      </Wrapper>
    </OrderConfirmContext.Provider>
  );
};

export default OrderConfirm;
