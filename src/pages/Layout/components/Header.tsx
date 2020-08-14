import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>全部分类</li>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/patent">专利市场</Link>
          </li>
          <li>
            <a href="#">秒杀活动</a>
          </li>
          <li>
            <a href="#">特价专利</a>
          </li>
          <li>
            <Link to="/auth/sign_in">您好，请登录</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
