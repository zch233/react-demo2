import React, { useEffect, useState } from 'react';
import { PatentList, PatentListItem, Section, Title } from './ListStyles';
import * as api from './api';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

type Props = {
  title: string;
  category: string;
};

const List: React.FC<Props> = ({ title, category }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Patent[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const getRecommendPatents = async (categoryShortName: string) => {
    setLoading(true);
    const { data } = await api.getRecommendPatents({ categoryShortName, size: 6 });
    setLoading(false);
    setList(data.list);
    if (data.list.length === 0) setIsEmpty(true);
  };
  useEffect(() => {
    getRecommendPatents(category);
  }, [category]);
  if (isEmpty) return <></>;
  return (
    <Section className={'pageWidthWithCenter'}>
      <Title>
        <span>{title}</span>
        <Link to={`/patent?category=${category}`}>
          <span className={'option'}>显示更多</span>
        </Link>
      </Title>
      <PatentList>
        {loading ? (
          <Skeleton active loading={loading} />
        ) : (
          list.map((item) => (
            <PatentListItem key={item.id}>
              <Link to={`/patent/${item.number}`}>
                <div className={'imageWrapper'}>
                  <img height={'120'} width={'100%'} src={require('../../assert/patent/' + category + '.png')} alt="" />
                </div>
                <div className={'patentInfo'}>
                  <cite className={'patentInfo-title'}>{item.name}</cite>
                  <p className={'patentInfo-des'}>
                    <em>
                      <em>￥</em>20000
                    </em>
                    <span>未下证</span>
                  </p>
                </div>
              </Link>
            </PatentListItem>
          ))
        )}
      </PatentList>
    </Section>
  );
};
export default List;
