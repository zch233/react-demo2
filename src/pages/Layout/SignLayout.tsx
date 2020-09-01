import React from 'react';
import { Link, RouteProps, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import styled from 'styled-components';

interface Props {
  routes: RouteProps[];
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;
const Section = styled.section`
  background-color: #9cd693;
  width: 100%;
  height: 60vh;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .webSiteProfile {
    background-color: #5d8a56;
    padding: 30px;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 24px;
      margin-top: 40px;
    }
    p {
      margin-bottom: 0;
    }
    h2 {
      font-size: 18px;
      margin-top: 30px;
    }
  }
`;
const SignLayout: React.FC<Props> = ({ routes }) => {
  return (
    <Wrapper>
      <Section>
        <Content className={'pageWidthWithCenter'}>
          <div className={'webSiteProfile'}>
            <Link to={'/'}>
              <img width={160} src={require('../../assert/home/logo_transparent.png')} alt="" />
            </Link>
            <h1>第九区知识产权</h1>
            <p>全方位的购买咨询 | 海量一手资源 | 专业支持</p>
            <p>的售后咨询 | 高效的交易体验</p>
            <h2>知识产权交易系统及行业方案</h2>
            <p>专利交易 商标交易 企业服务 需求挖掘</p>
            <p>法律咨询</p>
          </div>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Content>
      </Section>
    </Wrapper>
  );
};

export default SignLayout;
