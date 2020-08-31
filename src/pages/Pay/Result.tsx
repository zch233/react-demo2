import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Result as AntdResult, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as api from './api';
import queryString from 'query-string';

const Wrapper = styled.section`
  background-color: #fff;
  padding: 37px 0;
  .number {
    padding: 10px;
  }
`;
const Result: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successPay, setSuccessPay] = useState(true);
  const params = useMemo(() => queryString.parse(window.location.search) as { orderNo: string; out_trade_no: string }, []);
  const getPayResult = useCallback(() => {
    api
      .getPayResult(params.out_trade_no)
      .then(() => setSuccessPay(true))
      .catch(() => {
        setSuccessPay(false);
        setLoading(false);
      });
  }, [params]);
  useEffect(() => {
    getPayResult();
  }, [getPayResult]);
  return (
    <Spin spinning={loading}>
      <Wrapper>
        <AntdResult
          status={successPay ? 'success' : 'error'}
          title={successPay ? '订单支付成功！' : '订单支付失败！'}
          subTitle={
            <article className={'number'}>
              {params.orderNo && <span>订单号：{params.orderNo}</span>}
              <br />
              订单交易流水号：{params.out_trade_no}
            </article>
          }
          extra={[
            <Link to={'/user/order'} key="myOrder">
              <Button type="primary">我的订单</Button>
            </Link>,
            <Link to={'/patent'} key="buy">
              <Button>随便看看</Button>
            </Link>,
          ]}
        />
      </Wrapper>
    </Spin>
  );
};

export default Result;
