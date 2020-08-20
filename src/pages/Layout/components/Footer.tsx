import React from 'react';
import { ChooseUs, CopyRight, QrCode, Questions, Solution, WebSiteHelp, Wrapper } from './FooterStyles';
import { Modal } from 'antd';

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
          <p
            className={'reason'}
            onClick={() =>
              Modal.info({ title: '为何需要专利？', content: '①提升企业竞争力；②实施专利战略的基础；③创新能力和核心竞争能力的体现；④申报科技项目的必要前' })
            }
          >
            为何需要专利？
          </p>
          <p
            className={'reason'}
            onClick={() => Modal.info({ title: '专利的有效期是多少年？', content: '发明专利20年；实用新型专利10年；外观设计专利10年。' })}
          >
            专利的有效期是多少年？
          </p>
          <p
            className={'reason'}
            onClick={() => Modal.info({ title: '发明专利授权的必要条件是什么？', content: '授予专利权的发明，应当具备新颖性、创造性和实用性。' })}
          >
            发明专利授权的必要条件是什么？
          </p>
        </Questions>
        <QrCode>
          <p className={'title'}>微信公众号</p>
          <img src={require('../../../assert/home/qrcode.jpg')} alt="" />
        </QrCode>
      </WebSiteHelp>
      <CopyRight className={'pageWidthWithCenter'}>
        <p className="gov">
          <a href="http://www.miit.gov.cn" target="_blank" rel="noopener noreferrer">
            <img src={require('../../../assert/footer/ba.png')} alt={''} />
            &nbsp;浙ICP备18033218号-1
          </a>
          <a href="http://zjamr.zj.gov.cn" target="_blank" rel="noopener noreferrer">
            <img src={require('../../../assert/footer/gs.gif')} alt={''} />
            &nbsp;浙江工商
          </a>
        </p>
        <p>杭州第九区知识产权运营有限公司 © 2018-2021 9ip.com All rights reserved.</p>
      </CopyRight>
    </Wrapper>
  );
};

export default Footer;
