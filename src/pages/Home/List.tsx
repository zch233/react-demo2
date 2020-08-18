import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  category: string;
};
const Section = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Title = styled.h3`
  font-weight: 600;
  font-size: 22px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .option {
    color: #aaa;
    font-size: 14px;
    font-weight: normal;
  }
`;
const PatentList = styled.ul`
  display: flex;
`;
const PatentListItem = styled.li`
  border: 1px solid #ededed;
  width: 16.66%;
  margin-right: 1.3%;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;
  &:hover {
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    transition: all 0.3s ease;
    transform: translateY(-6px);
  }
  &:last-child {
    margin-right: 0;
  }
  .patentInfo {
    display: flex;
    flex-direction: column;
    height: 6em;
    padding-top: 8px;
    &-des {
      font-size: 20px;
      font-weight: 700;
      color: #ff4400;
      letter-spacing: 0.8px;
      margin-top: auto;
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 1;
      p {
        margin: 0;
      }
      span {
        font-size: 12px;
        color: #888;
        font-weight: normal;
      }
    }
    &-price {
      font-size: 20px;
      font-weight: 700;
      color: #ff4400;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
      em {
        font-weight: normal;
        word-break: break-all;
      }
      span {
        font-size: 12px;
        color: #888;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    &-title {
      color: #3d3d3d;
      line-height: 1.4;
    }
    &-status {
      margin-bottom: 0;
      margin-top: auto;
      font-size: 12px;
    }
  }
`;
const List: React.FC<Props> = ({ title, category }) => {
  return (
    <Section className={'pageWidthWithCenter'}>
      <Title>
        {title}
        <span className={'option'}>显示更多</span>
      </Title>
      <PatentList>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
        <PatentListItem>
          <div className={'imageWrapper'}>
            <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
          </div>
          <div className={'patentInfo'}>
            <cite className={'patentInfo-title'}>一种高档的显示器储存消毒柜一种高档</cite>
            <p className={'patentInfo-des'}>
              <p>
                <em>￥</em>20000
              </p>
              <span>未下证</span>
            </p>
          </div>
        </PatentListItem>
      </PatentList>
    </Section>
  );
};
export default List;
