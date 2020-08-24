import React from 'react';
import { PatentInfo, ShopInfo, Wrapper } from './PatentStyles';
import AliIcon from '../../components/AliIcon';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Patent: React.FC = () => {
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <PatentInfo>
        <div className={'imageWrapper'}>
          <img width={'100%'} src={require('../../assert/patent/A.png')} alt="" />
        </div>
        <div className={'info'}>
          <h1>一种水晶安装装置</h1>
          <div className={'itemWrapper'}>
            <div className={'leftItem'}>
              <p>
                <label>专利号</label>20191213213121
              </p>
              <p>
                <label>法律状态</label>20191213213121
              </p>
              <p>
                <label>发明人</label>20191213213121
              </p>
              <p>
                <label>VIP会员价</label>20191213213121
              </p>
            </div>
            <div className={'rightItem'}>
              <p>
                <label>专利类型</label>发明类型
              </p>
              <p>
                <label>缴费截止</label>发明类型
              </p>
              <p>
                <label>销售状态</label>发明类型
              </p>
              <p>
                <label>零售价</label>30000.00
              </p>
            </div>
          </div>
          <div className={'bottom'}>
            <Link to={'/order/confirm'}>
              <Button size={'large'} className={'buyButton'} type={'primary'} danger>
                立即购买
              </Button>
            </Link>
            <em className={'buyTips'}>此商品已全权委托平台寄卖，平台免费提供担保交易服务。</em>
          </div>
        </div>
      </PatentInfo>
      <ShopInfo>
        <div className={'topBar'}>
          <label>
            <AliIcon icon={'shop'}></AliIcon>
          </label>
          <p>自营</p>
        </div>
        <div className={'bottomBar'}>
          <p>
            <AliIcon icon={'shopCard'}></AliIcon>实名认证
          </p>
          <p>
            <AliIcon icon={'shopOne'}></AliIcon>一手认证
          </p>
          <p>
            <AliIcon icon={'shopAgent'}></AliIcon>独家代理认证
          </p>
          <p>
            <AliIcon icon={'shopSend'}></AliIcon>平台寄卖
          </p>
        </div>
      </ShopInfo>
    </Wrapper>
  );
};

export default Patent;
