import React from 'react';
import { Card } from 'antd';
import { Wrapper } from './PatentCardStyles';
import AliIcon from '../../components/AliIcon';

const PatentCard: React.FC = () => {
  return (
    <Wrapper>
      <Card title="商品信息">
        <p className={'preTips'}>
          <AliIcon icon={'warning'}></AliIcon>温馨提醒：您正在购买预售产品（法律状态为质检），如该专利最终未授权，请及时联系客户经理售后处理。祝您购物愉快！
        </p>
        <div className={'patent'}>
          <div className={'imageWrapper'}>
            <img width={'100%'} src={require('../../assert/patent/a.png')} alt="" />
          </div>
          <div className={'info'}>
            <p className={'info-title'}>一种水晶安装装置</p>
            <div className={'info-detail'}>
              <div className={'info-detail-left'}>
                <p className={'info-detail-item'}>
                  <label>专利号</label>：2019107917635
                </p>
                <p className={'info-detail-item'}>
                  <label>法律状态</label>：待质检抽案（未下证）
                </p>
                <p className={'info-detail-item'}>
                  <label>发明人</label>：提供
                </p>
                <p className={'info-detail-item'}>
                  <label>价格</label>：20000.00
                </p>
              </div>
              <div className={'info-detail-right'}>
                <p className={'info-detail-item'}>
                  <label>专利类型</label>：发明专利
                </p>
                <p className={'info-detail-item'}>
                  <label>缴费截止日</label>：2020-09-02
                </p>
                <p className={'info-detail-item'}>
                  <label>标签</label>：水晶,安装
                </p>
                <p className={'info-detail-item'}>
                  <label>数量</label>：
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default PatentCard;
