import React from 'react';
import { ChooseUs, CopyRight, QrCode, Questions, Solution, WebSiteHelp, Wrapper } from './FooterStyles';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <WebSiteHelp className={'pageWidthWithCenter'}>
        <ChooseUs>
          <p className={'title'}>选择我们</p>
          <p className={'reason'}>全方位的购买咨询</p>
          <p className={'reason'}>海量一手资源</p>
          <p className={'reason'}>专业支持的售后咨询</p>
          <p className={'reason'}>高效的交易体验</p>
        </ChooseUs>
        <Solution>
          <p className={'title'}>知识产权交易系统及行业方案</p>
          <div className={'reasonWrapper'}>
            <div>
              <p className={'reason'}>专利交易</p>
              <p className={'reason'}>商标交易</p>
              <p className={'reason'}>企业服务</p>
              <p className={'reason'}>需求挖掘</p>
            </div>
            <div>
              <p className={'reason'}>法律咨询</p>
            </div>
          </div>
        </Solution>
        <Questions>
          <p className={'title'}>常见问题</p>
          <p className={'reason'}>为什么要购买？</p>
          <p className={'reason'}>怎么购买？</p>
          <p className={'reason'}>如何保证？</p>
        </Questions>
        <QrCode>
          <p className={'title'}>微信公众号</p>
          <img src={require('../../../assert/home/qrcode.jpg')} alt="" />
        </QrCode>
      </WebSiteHelp>
      <CopyRight className={'pageWidthWithCenter'}>
        <p className="gov">
          <a href="http://www.miit.gov.cn" target="_blank">
            <img src={require('../../../assert/footer/ba.png')} />
            &nbsp;浙ICP备18033218号-1
          </a>
          <a href="http://zjamr.zj.gov.cn" target="_blank">
            <img src={require('../../../assert/footer/gs.gif')} />
            &nbsp;浙江工商
          </a>
        </p>
        <p>杭州第九区知识产权运营有限公司 © 2018-2021 9ip.com All rights reserved.</p>
      </CopyRight>
    </Wrapper>
  );
};

export default Footer;
