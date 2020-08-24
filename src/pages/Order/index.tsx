import React from 'react';
import OrderItem from './OrderItem';
import { Pagination } from 'antd';
import styled from 'styled-components';

const PaginationWrapper = styled.section`
  text-align: center;
  margin-top: 15px;
`;
const Order: React.FC = () => {
  return (
    <>
      <OrderItem />
      <PaginationWrapper>
        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
      </PaginationWrapper>
    </>
  );
};

export default Order;
