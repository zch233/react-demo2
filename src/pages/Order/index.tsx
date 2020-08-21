import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const OrderItem = styled.div`
  border: 1px #ddd solid;
  margin-top: 15px;
  .topBar {
    display: flex;
    font-size: 12px;
    color: #000;
    background-color: #eee;
    p {
      margin: 0;
      padding: 10px;
    }
    .orderInfo {
      flex: 2.8;
      time {
        font-weight: bold;
        margin-right: 1em;
      }
    }
    .orderShop {
      flex: 1.5;
    }
    .orderManager {
      flex: 2;
      padding: 10px 30px 10px 10px;
      label {
        margin-right: 1em;
      }
    }
  }
  .bottomBar {
    display: flex;
    > div {
      padding: 10px;
    }
    .productInfo {
      display: flex;
      align-items: center;
      border-right: 1px solid #ddd;
      flex: 2.8;
      .imageWrapper {
        width: 80px;
      }
      .info {
        margin-left: 10px;
        flex: 1;
        .title {
          color: #31708f;
          font-size: 16px;
          line-height: 1.1;
        }
        em {
          color: #777;
        }
      }
    }
    .productPrice {
      color: #000;
      border-right: 1px solid #ddd;
      flex: 1.5;
      font-size: 12px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      p {
        margin: 0;
      }
      .result {
        color: #e4393c;
        em {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .productStatus {
      flex: 1;
      border-right: 1px solid #ddd;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .productOptions {
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      p {
        margin: 0;
      }
      .delete {
        color: #000;
        font-size: 12px;
        &:hover {
          span {
            text-decoration: underline;
            color: #23527c;
          }
        }
      }
    }
  }
`;
const Order: React.FC = () => {
  return (
    <>
      <OrderItem>
        <div className={'topBar'}>
          <p className={'orderInfo'}>
            <time>2020-07-29 18:17:16</time>
            <span>订单号：70941770464100352</span>
          </p>
          <p className={'orderShop'}>买家：自营</p>
          <p className={'orderManager'}>
            <label>客户经理：陈佳佳</label>电话：13884446701
          </p>
        </div>
        <div className={'bottomBar'}>
          <div className={'productInfo'}>
            <div className={'imageWrapper'}>
              <img width={'100%'} src={require('../../assert/patent/a.png')} alt="" />
            </div>
            <div className={'info'}>
              <p className={'title'}>一种方便开启以及闭合的建筑内消防栓箱</p>
              <em>2019112761773</em>
            </div>
          </div>
          <div className={'productPrice'}>
            <p>原价：￥20000.00</p>
            <p>VIP会员折扣：-￥5000</p>
            <p className={'result'}>
              实付：<em>￥15000.00</em>
            </p>
          </div>
          <div className={'productStatus'}></div>
          <div className={'productOptions'}>
            <p>订单已关闭</p>
            <Button size={'small'} className={'delete'} type="text">
              删除订单
            </Button>
          </div>
        </div>
      </OrderItem>
    </>
  );
};

export default Order;
