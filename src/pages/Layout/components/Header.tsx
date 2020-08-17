import React from 'react';
import { Link } from 'react-router-dom';
import AliIcon from '../../../components/AliIcon';
import { Button, Input, Popover, Tabs } from 'antd';
import { LoginDialogWrapper, NavBar, SearchBar, TopBar } from './HeaderStyles';

const Header: React.FC = () => {
  const loginDialog = (
    <LoginDialogWrapper>
      <Tabs type="card" size="small">
        <Tabs.TabPane tab="密码登录" key="passwordLogin">
          <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
          <Input className={'input'} addonBefore="密　码" defaultValue="mysite" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手机验证码登录" key="captchaLogin">
          <Input className={'input'} addonBefore="手机号" defaultValue="mysite" />
          <Input className={'input'} addonBefore="验证码" defaultValue="mysite" />
        </Tabs.TabPane>
      </Tabs>
      <Button className={'loginButton'} block>
        登录
      </Button>
      <Link className={'toSignIn'} to="/auth/sign_in">
        新用户注册
      </Link>
    </LoginDialogWrapper>
  );
  return (
    <header>
      <TopBar>
        <div className={'pageWidthWithCenter'}>
          <cite>第九区知识产权在线交易商城提供最真实的一手资源</cite>
          <span>
            <AliIcon icon="qrcode" />
            微信公众号
          </span>
        </div>
      </TopBar>
      <SearchBar className={'pageWidthWithCenter'}>
        <div className={'imageWrapper'}>
          <img width="100%" src={require('../../../assert/home/logo.png')} alt="LOGO" />
        </div>
        <form className={'searchWrapper'} action="/patent">
          <input className="searchInput" name="word" placeholder="专利号、名称、关键词" />
          <input hidden name="stockStatus" value="1" />
          <button type="submit">搜索</button>
        </form>
      </SearchBar>
      <NavBar>
        <section className={'pageWidthWithCenter'}>
          <div className={'allCategory'}>
            全部专利分类
            <AliIcon icon="downFill" />
          </div>
          <ul className={'navList'}>
            <li className={'navList-item active'}>
              <Link to="/">首页</Link>
            </li>
            <li className={'navList-item'}>
              <Link to="/patent">专利市场</Link>
            </li>
            <li className={'navList-item'}>
              <Link to="/">秒杀活动</Link>
            </li>
            <li className={'navList-item'}>
              <Link to="/">特价专利</Link>
            </li>
          </ul>
          <div className={'userOrLogin'}>
            您好，
            <Popover placement="bottomRight" content={loginDialog} trigger="click">
              <span className={'loginSwitch'}>请登录</span>
            </Popover>
          </div>
        </section>
      </NavBar>
    </header>
  );
};
export default Header;
