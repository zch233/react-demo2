import React, { useState } from 'react';
import { Button, Result as AntdResult } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  background-color: #fff;
  padding: 37px 0;
  .number {
    padding: 10px;
  }
`;
const Result: React.FC = () => {
  const [successPay, setSuccessPay] = useState(true);
  return (
    <Wrapper>
      <AntdResult
        status={successPay ? 'success' : 'error'}
        title={successPay ? '订单支付成功！' : '订单支付失败！'}
        subTitle={
          <article className={'number'}>
            订单号：{'2017182818828182881'}
            <br />
            订单交易流水号：{'2342342423'}
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
  );
};

export default Result;
