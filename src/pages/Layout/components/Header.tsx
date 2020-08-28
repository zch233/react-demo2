import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import AliIcon from '../../../components/AliIcon';
import { message, Popover } from 'antd';
import LoginDialog from './LoginDialog';
import { NavBar, SearchBar, TopBar } from './HeaderStyles';
import CategoryDialog from './CategoryDialog';
import queryString from 'query-string';
import * as api from '../../../api/base';
import { StoreContext } from '../../../index';
import UserDialog from './UserDialog';

const Header: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const [keyword, setKeyword] = useState('');
  const searchPatentWithKeyword = useCallback(
    (event) => {
      history.push(`/patent?word=${keyword}`);
      event.preventDefault();
      return false;
    },
    [keyword, history]
  );
  const getUser = useCallback(() => {
    api
      .getUserDefault()
      .then(({ data }) => dispatch({ type: 'setUser', payload: data.data }))
      .catch(() => {});
  }, [dispatch]);
  useEffect(() => {
    const { word } = queryString.parse(window.location.search) as { word?: string };
    word && setKeyword(word);
    getUser();
  }, [getUser]);
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
          <form className={'searchWrapper'} onSubmit={searchPatentWithKeyword}>
            <input className="searchInput" name="word" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="专利号、名称、关键词" />
            <button type={'submit'}>搜索</button>
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
            {state.user.account ? (
              <Popover
                visible={popoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
                placement="bottomRight"
                content={<UserDialog setPopoverVisible={(value) => setPopoverVisible(value)} />}
                trigger="click"
              >
                <span className={'loginSwitch'}>{state.user.nickname}</span>
              </Popover>
            ) : (
              <Popover
                visible={popoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
                placement="bottomRight"
                content={<LoginDialog setPopoverVisible={(value) => setPopoverVisible(value)} />}
                trigger="click"
              >
                <span className={'loginSwitch'}>请登录</span>
              </Popover>
            )}
          </div>
        </section>
      </NavBar>
    </>
  );
};
export default Header;
