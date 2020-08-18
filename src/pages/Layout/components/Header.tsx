import React from 'react';
import { Link } from 'react-router-dom';
import AliIcon from '../../../components/AliIcon';
import { Popover } from 'antd';
import LoginDialog from './LoginDialog';
import { NavBar, SearchBar, TopBar } from './HeaderStyles';
import CategoryDialog from './CategoryDialog';

const Header: React.FC = () => {
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
            <Popover placement="bottomLeft" content={CategoryDialog} trigger="focus">
              <input className={'hideInput'} type="text" />
            </Popover>
            全部专利分类
            <AliIcon icon="downFill" />
          </label>
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
