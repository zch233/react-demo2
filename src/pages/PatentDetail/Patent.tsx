import React, { useCallback, useEffect, useState } from 'react';
import { PatentInfo, ShopInfo, Wrapper } from './PatentStyles';
import AliIcon from '../../components/AliIcon';
import { Button, Skeleton, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as api from './api';
import { PATENT_CERT_STATUS, PATENT_STOCK_STATUS, PATENT_TYPE } from '../../utils/dict';

type PatentDetail = Partial<Patent & Shop>;
const Patent: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [patentDetail, setPatentDetail] = useState<PatentDetail>({});
  const getPatentDetail = useCallback(async () => {
    setLoading(true);
    const { number } = params as { number: string };
    const { data } = await api.getPatentDetail(number).finally(() => setLoading(false));
    setPatentDetail(data);
  }, [params]);

  useEffect(() => {
    getPatentDetail();
  }, [getPatentDetail]);
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <PatentInfo>
        {loading ? (
          <Skeleton.Image style={{ width: 300, height: 300 }} />
        ) : (
          <div className={'imageWrapper'}>
            <img width={'100%'} src={require('../../assert/patent/' + (patentDetail.category || 'A') + '.png')} alt="" />
          </div>
        )}
        <div className={'info'}>
          <Skeleton active loading={loading} paragraph={{ rows: 6 }}>
            <h1>{patentDetail.name}</h1>
            <div className={'itemWrapper'}>
              <div className={'item-left'}>
                <label>专利号</label>
                {patentDetail.number}
              </div>
              <div className={'item-right'}>
                <label>专利类型</label>
                {PATENT_TYPE.label[patentDetail.type as 1 | 2 | 3]}
              </div>
            </div>
            <div className={'itemWrapper'}>
              <div className={'item-left'}>
                <label>法律状态</label>
                {patentDetail.legalStatus}（{PATENT_CERT_STATUS.label[patentDetail.certStatus as 0 | 1 | 2]}）
              </div>
              <div className={'item-right'}>
                <label>缴费截止</label>
                {patentDetail.paymentDeadline || '无'}
              </div>
            </div>
            <div className={'itemWrapper'}>
              <div className={'item-left'}>
                <label>发明人</label>
                {patentDetail.inventorExplain}
              </div>
              <div className={'item-right'}>
                <label>销售状态</label>
                {patentDetail.stockStatus === 1 ? (
                  <Tag color="#87d068">可售</Tag>
                ) : (
                  <span>{PATENT_STOCK_STATUS.label[patentDetail.stockStatus as 0 | 1 | 2 | 3 | 4]}</span>
                )}
              </div>
            </div>
            <div className={'itemWrapper'}>
              <div className={'item-left'}>
                <label>VIP会员价</label>
                <em className={'vipPrice'}>
                  <span className={'mark'}>￥</span>
                  {patentDetail.vipPrice}
                </em>
              </div>
              <div className={'item-right'}>
                <label>零售价</label>￥{patentDetail.price}
              </div>
            </div>
          </Skeleton>
          {loading ? (
            <Skeleton.Button active />
          ) : (
            <div className={'bottom'}>
              <Link to={`/order/confirm?commodityId=${patentDetail.id}`}>
                {patentDetail.stockStatus === PATENT_STOCK_STATUS.CAN_SELL || patentDetail.stockStatus === PATENT_STOCK_STATUS.PRE_SELL ? (
                  <Button size={'large'} className={'buyButton'} type={'primary'} danger>
                    立即购买
                  </Button>
                ) : (
                  <Button size={'large'} disabled>
                    不可售
                  </Button>
                )}
              </Link>
              <em className={'buyTips'}>此商品已全权委托平台寄卖，平台免费提供担保交易服务。</em>
            </div>
          )}
        </div>
      </PatentInfo>
      <ShopInfo>
        <Skeleton loading={loading} active avatar paragraph={{ rows: 4 }}>
          <div className={'topBar'}>
            <label>
              <AliIcon icon={'shop'} />
            </label>
            <p>{patentDetail.shopName}</p>
          </div>
          <div className={'bottomBar'}>
            <p>
              <AliIcon icon={'shopCard'} />
              实名认证
            </p>
            <p>
              <AliIcon icon={'shopOne'} />
              一手认证
            </p>
            <p>
              <AliIcon icon={'shopAgent'} />
              独家代理认证
            </p>
            <p>
              <AliIcon icon={'shopSend'} />
              平台寄卖
            </p>
          </div>
        </Skeleton>
      </ShopInfo>
    </Wrapper>
  );
};

export default Patent;
