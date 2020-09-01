import React, { useContext } from 'react';
import { Card, Skeleton } from 'antd';
import { Wrapper } from './PatentCardStyles';
import AliIcon from '../../components/AliIcon';
import { OrderConfirmContext } from './index';
import { PATENT_CERT_STATUS, PATENT_STOCK_STATUS, PATENT_TYPE } from '../../utils/dict';

const PatentCard: React.FC = () => {
  const { loading, orderConfirm } = useContext(OrderConfirmContext);
  return (
    <Wrapper>
      <Card title="商品信息">
        {orderConfirm?.stockStatus === PATENT_STOCK_STATUS.PRE_SELL && (
          <p className={'preTips'}>
            <AliIcon icon={'warning'} />
            温馨提醒：您正在购买预售产品（法律状态为质检），如该专利最终未授权，请及时联系客户经理售后处理。祝您购物愉快！
          </p>
        )}
        <div className={'patent'}>
          {loading ? (
            <Skeleton.Image style={{ width: 300, height: 300, marginRight: 20 }} />
          ) : (
            <div className={'imageWrapper'}>
              <img width={'100%'} src={require('../../assert/patent/' + (orderConfirm?.category || 'A') + '.png')} alt="" />
            </div>
          )}
          <div className={'info'}>
            <Skeleton active paragraph={{ rows: 8 }} loading={loading}>
              <p className={'info-title'}>{orderConfirm?.name}</p>
              <div className={'info-detail'}>
                <div className={'info-detail-left'}>
                  <p className={'info-detail-item'}>
                    <label>专利号</label>：{orderConfirm?.number}
                  </p>
                  <p className={'info-detail-item'}>
                    <label>法律状态</label>：{orderConfirm?.legalStatus}（
                    {orderConfirm?.certStatus && PATENT_CERT_STATUS.label[(orderConfirm as { certStatus: 0 | 1 | 2 }).certStatus.toString() as '0' | '1' | '2']}
                    ）
                  </p>
                  <p className={'info-detail-item'}>
                    <label>发明人</label>：{orderConfirm?.inventorExplain}
                  </p>
                  <p className={'info-detail-item'}>
                    <label>价格</label>：{orderConfirm?.price}
                  </p>
                </div>
                <div className={'info-detail-right'}>
                  <p className={'info-detail-item'}>
                    <label>专利类型</label>：{orderConfirm?.type && PATENT_TYPE.label[(orderConfirm as { type: 1 | 2 | 3 }).type.toString() as '1' | '2' | '3']}
                  </p>
                  <p className={'info-detail-item'}>
                    <label>缴费截止日</label>：{orderConfirm?.paymentDeadline}
                  </p>
                  <p className={'info-detail-item'}>
                    <label>标签</label>：{orderConfirm?.tags}
                  </p>
                  <p className={'info-detail-item'}>
                    <label>数量</label>：1
                  </p>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default PatentCard;
