import React, { useCallback, useEffect, useState } from 'react';
import { PatentInfo, ShopInfo, Wrapper } from './PatentStyles';
import AliIcon from '../../components/AliIcon';
import { Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as api from './api';

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
              <div className={'leftItem'}>
                <p>
                  <label>专利号</label>
                  {patentDetail.number}
                </p>
                <p>
                  <label>法律状态</label>
                  {patentDetail.legalStatus}
                </p>
                <p>
                  <label>发明人</label>
                  {patentDetail.inventorExplain}
                </p>
                <p>
                  <label>VIP会员价</label>
                  {patentDetail.price && patentDetail.price * 0.75}
                </p>
              </div>
              <div className={'rightItem'}>
                <p>
                  <label>专利类型</label>
                  {patentDetail.type}
                </p>
                <p>
                  <label>缴费截止</label>
                  {patentDetail.paymentDeadline || '无'}
                </p>
                <p>
                  <label>销售状态</label>
                  {patentDetail.stockStatus}
                </p>
                <p>
                  <label>零售价</label>
                  {patentDetail.price}
                </p>
              </div>
            </div>
          </Skeleton>
          {loading ? (
            <Skeleton.Button active />
          ) : (
            <div className={'bottom'}>
              <Link to={`/order/confirm?commodityId=${patentDetail.id}`}>
                <Button size={'large'} className={'buyButton'} type={'primary'} danger>
                  立即购买
                </Button>
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
