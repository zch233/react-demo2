import React, { useCallback, useEffect, useState, createContext } from 'react';
import styled from 'styled-components';
import Steps from './Steps';
import PatentCard from './PatentCard';
import RemarkCard from './RemarkCard';
import PayCard from './PayCard';
import * as api from './api';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

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
type OrderConfirm = Partial<Patent & Shop & Order>;
type Context = {
  loading?: boolean;
  orderConfirm?: OrderConfirm;
};
export const OrderConfirmContext = createContext<Context>({});
const OrderConfirm: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState<OrderConfirm>({});
  const getOrderConfirm = useCallback(async () => {
    const { commodityId } = queryString.parse(location.search) as { commodityId: string };
    setLoading(true);
    const { data }: { data: Patent & Shop } = await api
      .getOrderConfirm({
        commodityId,
        commodityType: 'PATENT',
      })
      .finally(() => setLoading(false));
    setOrderConfirm(data);
  }, [location]);
  useEffect(() => {
    getOrderConfirm();
  }, [getOrderConfirm]);
  return (
    <OrderConfirmContext.Provider value={{ loading, orderConfirm }}>
      <Wrapper>
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
      </Wrapper>
    </OrderConfirmContext.Provider>
  );
};

export default OrderConfirm;
