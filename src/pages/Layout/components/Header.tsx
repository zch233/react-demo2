import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AliIcon from '../../../components/AliIcon';
import { message, Popover } from 'antd';
import LoginDialog from './LoginDialog';
import { NavBar, SearchBar, TopBar } from './HeaderStyles';
import CategoryDialog from './CategoryDialog';

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <>
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
      </header>
      <NavBar>
        <section className={'pageWidthWithCenter'}>
          <label className={'allCategory'}>
            全部专利分类
            <AliIcon icon="downFill" />
            <div className={'categoryDialog'}>
              <CategoryDialog />
            </div>
          </label>
          <ul className={'navList'}>
            <li className={`navList-item ${location.pathname === '/' ? 'active' : ''}`}>
              <NavLink className={'link'} to="/">
                首页
              </NavLink>
            </li>
            <li className={`navList-item ${location.pathname === '/patent' ? 'active' : ''}`}>
              <NavLink className={'link'} to="/patent">
                专利市场
              </NavLink>
            </li>
            <li className={'navList-item'} onClick={() => message.info('敬请期待')}>
              <span className={'link'}>秒杀活动</span>
            </li>
            <li className={'navList-item'} onClick={() => message.info('敬请期待')}>
              <span className={'link'}>特价专利</span>
            </li>
          </ul>
          <div className={'userOrLogin'}>
            您好，
            <Popover placement="bottomRight" content={LoginDialog} trigger="click">
              <span className={'loginSwitch'}>请登录</span>
            </Popover>
          </div>
        </section>
      </NavBar>
    </>
  );
};
export default Header;
