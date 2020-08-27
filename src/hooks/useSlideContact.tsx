import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as api from '../api/base';
import AliIcon from '../components/AliIcon';

const Wrapper = styled.aside`
  position: fixed;
  top: 23.6vh;
  right: 0;
  display: flex;
  align-items: flex-start;
  z-index: 10;
  transition: all 0.3s;
  transform: translateX(calc(100% - 36px));
  &.active {
    transform: translateX(0);
  }
  .button {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 1.4em 0.6em;
    width: 40px;
    line-height: 1.2;
    background-color: #d03322;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  p {
    margin: 0;
  }
  .main {
    background-color: #fff;
    box-shadow: -2px 0 3px rgba(0, 0, 0, 0.25);
    .title {
      background: #a52600;
      color: #fff;
      font-size: 16px;
      padding: 10px 14px;
      margin: 0;
    }
    .contactWrapper {
      padding: 0 14px;
    }
    .contactItem {
      display: flex;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
      }
      &-name {
        width: 3em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
        font-weight: bold;
      }
    }
    .imageWrapper {
      width: 100%;
      padding: 10px 20px;
      background-color: #ebebeb;
      text-align: center;
    }
  }
`;
type ContactConfig = {
  id: number;
  mobile: string;
  nickname: string;
  qq: string;
  wx: string;
};
const initContactConfig: ContactConfig[] = JSON.parse(window.sessionStorage.getItem('contactConfig') || '[]');
const initContactConfigVisible = !!window.localStorage.getItem('contactConfigVisible');
const useSlideContact = () => {
  const [contactConfig, setContactConfig] = useState<ContactConfig[]>(initContactConfig);
  const [contactConfigVisible, setContactConfigVisible] = useState(initContactConfigVisible);
  const getContactConfig = async () => {
    const { data } = await api.getContactConfig();
    window.sessionStorage.setItem('contactConfig', JSON.stringify(data));
    setContactConfig(data);
  };
  const handleClick = useCallback(() => {
    console.log(contactConfigVisible);
    setContactConfigVisible(!contactConfigVisible);
  }, [contactConfigVisible]);
  useEffect(() => {
    if (contactConfig.length === 0) getContactConfig();
  }, [contactConfig]);
  const SlideContactConfig = (
    <Wrapper className={contactConfigVisible ? 'active' : ''}>
      <p className={'button'} onClick={handleClick}>
        联系我们
      </p>
      <section className={'main'}>
        <h3 className={'title'}>在线客服</h3>
        <article className={'contactWrapper'}>
          {contactConfig.map((contact) => (
            <div key={contact.id} className={'contactItem'}>
              <p className={'contactItem-name'}>{contact.nickname}</p>
              <div className={'contactItem-contact'}>
                <p className={'contactItem-contact-qq'}>
                  <a rel={'noopener noreferrer'} target="_blank" href={`tencent://message/?uin=${contact.qq}&Site=sc.chinaz.com&Menu=yes`}>
                    <AliIcon icon={'qqFill'} />
                    {contact.qq}
                  </a>
                </p>
                <p className={'mobile'}>
                  <AliIcon icon={'phoneFill'} />
                  {contact.mobile}
                </p>
              </div>
            </div>
          ))}
        </article>
        <div className={'imageWrapper'}>
          <img width={'100%'} src={require('../assert/home/qrcode.jpg')} alt="" />
          <p>微信公众号</p>
        </div>
      </section>
    </Wrapper>
  );
  return { SlideContactConfig };
};

export default useSlideContact;
