import React from 'react';
import { PatentList, PatentListItem, Section, Title } from './ListStyles';

type Props = {
  title: string;
  category: string;
};

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
