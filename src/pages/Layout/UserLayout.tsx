import React from 'react';
import { NavLink, RouteProps, Switch, useLocation } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import styled from 'styled-components';

interface Props {
  routes: RouteProps[];
}

const Wrapper = styled.section`
  background-color: #f5f5f5;
`;
const Main = styled.div`
  display: flex;
  padding: 15px 0;
`;
const Aside = styled.aside`
  width: 300px;
  background-color: #fff;
  margin-right: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  h1 {
    background-color: #dff0d8;
    padding: 10px;
    color: #3c763d;
    text-align: center;
    font-size: 24px;
    margin: 0;
  }
  .link {
    background-color: #f5f5f5;
    border-bottom: 1px dashed #ccc;
    padding: 10px 0;
    text-indent: 2em;
    color: #333;
    transition: all 0.3s;
    &.active {
      background-color: #ddd;
      color: #23527c;
    }
    &:hover {
      background-color: #ddd;
      color: #23527c;
    }
  }
`;
const Section = styled.section`
  background-color: #fff;
  padding: 0 15px;
  flex: 1;
`;
const links = [
  { title: '我的订单', path: '/user/order' },
  { title: '我的预定', path: '/user/preorder' },
  { title: 'VIP会员', path: '/user/vip' },
  { title: '账户设置', path: '/user/settings' },
];
const UserLayout: React.FC<Props> = ({ routes }) => {
  const location = useLocation();
  return (
    <Wrapper>
      <Main className={'pageWidthWithCenter'}>
        <Aside>
          <h1>会员中心</h1>
          {links.map((link) => (
            <NavLink className={`link ${location.pathname === link.path ? 'active' : ''}`} to={link.path}>
              {link.title}
            </NavLink>
          ))}
        </Aside>
        <Section>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Section>
      </Main>
    </Wrapper>
  );
};

export default UserLayout;
