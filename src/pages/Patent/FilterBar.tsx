import React, { useState } from 'react';
import { CategoryDetailWrapper, FilterSection, UserFilter, Wrapper } from './FilterStyles';
import AliIcon from '../../components/AliIcon';
import { Popover, Tag } from 'antd';

const FilterBar: React.FC = () => {
  const [filteredCategory, setFilteredCategory] = useState(['型芯', '型芯']);
  const [filterControl, setFilterControl] = useState({
    visible: true,
    text: '收起筛选',
    icon: 'top',
  });
  const handleFilterControl = () => {
    const control = filterControl.visible
      ? {
          visible: false,
          text: '显示筛选',
          icon: 'bottom',
        }
      : {
          visible: true,
          text: '收起筛选',
          icon: 'top',
        };
    setFilterControl(control);
  };
  const categoryDetail = (
    <CategoryDetailWrapper>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
      <p className={'item'}>A01农业；畜牧业；畜牧业；畜牧业；畜牧业；</p>
    </CategoryDetailWrapper>
  );
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <UserFilter>
        <div className={'filterText'}>
          <span>
            所有分类<AliIcon icon={'right'}></AliIcon>
          </span>
          {filteredCategory.map((filter) => (
            <Tag key={filter} closable>
              {filter}
            </Tag>
          ))}
        </div>
        <div className={'filterControl'} onClick={handleFilterControl}>
          {filterControl.text}
          <AliIcon icon={filterControl.icon}></AliIcon>
        </div>
      </UserFilter>
      {filterControl.visible && (
        <FilterSection>
          <div className={'filterItem'}>
            <label className={'filterItem-label'}>专利类型：</label>
            <span className={'filterItem-category active'}>全部</span>
            <span className={'filterItem-category'}>发明专利</span>
            <span className={'filterItem-category'}>新型实用专利</span>
            <span className={'filterItem-category'}>外观设计专利</span>
          </div>
          <div className={'filterItem'}>
            <label className={'filterItem-label'}>专利分类：</label>
            <span className={'filterItem-category active'}>全部</span>
            <Popover placement="bottom" content={categoryDetail}>
              <span className={'filterItem-category'}>A-人类生活必需</span>
            </Popover>
            <span className={'filterItem-category'}>B-作业；运输</span>
            <span className={'filterItem-category'}>C-化学</span>
            <span className={'filterItem-category'}>D-纺织；造纸</span>
            <span className={'filterItem-category'}>E-固定建筑物</span>
            <span className={'filterItem-category'}>F-机械工程；照明；加热；武器；爆破</span>
            <span className={'filterItem-category'}>G-物理</span>
            <span className={'filterItem-category'}>H-电学</span>
          </div>
          <div className={'filterItem'}>
            <label className={'filterItem-label'}>法律状态：</label>
            <span className={'filterItem-category active'}>全部</span>
            <span className={'filterItem-category'}>未下证</span>
            <span className={'filterItem-category'}>已下证</span>
            <span className={'filterItem-category'}>其他</span>
          </div>
        </FilterSection>
      )}
    </Wrapper>
  );
};

export default FilterBar;
