import React, { useState } from 'react';
import { CategoryDetailWrapper, FilterSection, UserFilter, Wrapper } from './FilterStyles';
import AliIcon from '../../components/AliIcon';
import { Popover, Tag } from 'antd';
import categories from '../../utils/categories';
import { PATENT_STATUS, PATENT_TYPE } from '../../utils/dict';

console.log(categories);
type Filtered = {
  code?: string;
  label?: string;
};
type FilteredCategory = {
  type: Filtered;
  category: Filtered;
  status: Filtered;
};
const initFilteredCategory = { type: {}, category: {}, status: {} };
const FilterBar: React.FC = () => {
  const [filteredCategory, setFilteredCategory] = useState<FilteredCategory>(initFilteredCategory);
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
  const categoryDetail = (subCategories: SubCategory[]) => (
    <CategoryDetailWrapper>
      {subCategories.map((subCategory) => {
        const { code, name } = subCategory;
        return (
          <p key={code} className={'item'} onClick={() => handleFilterClick('category', { code, label: name })}>
            {name}
          </p>
        );
      })}
    </CategoryDetailWrapper>
  );
  const handleFilterClick = (key: keyof FilteredCategory, data: Filtered) => {
    setFilteredCategory({ ...filteredCategory, [key]: data });
  };
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <UserFilter>
        <div className={'filterText'}>
          <span className={'allCategory'} onClick={() => setFilteredCategory(initFilteredCategory)}>
            所有分类<AliIcon icon={'right'}></AliIcon>
          </span>
          {(Object.keys(filteredCategory) as [keyof FilteredCategory])
            .map((key) => {
              const label = filteredCategory[key].label;
              return (
                label && (
                  <Tag key={label} closable onClose={() => handleFilterClick(key, {})}>
                    {label}
                  </Tag>
                )
              );
            })
            .filter(Boolean)}
        </div>
        <div className={'filterControl'} onClick={handleFilterControl}>
          {filterControl.text}
          <AliIcon icon={filterControl.icon}></AliIcon>
        </div>
      </UserFilter>
      <FilterSection className={filterControl.visible ? '' : 'hide'}>
        <div className={'filterItem'}>
          <label className={'filterItem-label'}>专利类型：</label>
          <span className={`filterItem-category ${filteredCategory.type.code ? '' : 'active'}`}>全部</span>
          {Object.typedKeys(PATENT_TYPE.label).map((key) => {
            const label = PATENT_TYPE.label[key];
            const code = key;
            return (
              <span
                onClick={() => handleFilterClick('type', { code, label })}
                key={code}
                className={`filterItem-category ${filteredCategory.type.code === code ? 'active' : ''}`}
              >
                {label}
              </span>
            );
          })}
        </div>
        <div className={'filterItem'}>
          <label className={'filterItem-label'}>专利分类：</label>
          <span className={`filterItem-category ${filteredCategory.category.code ? '' : 'active'}`}>全部</span>
          {categories.map((category) => {
            const { code, name } = category;
            const currentCode = filteredCategory.category.code;
            return (
              <Popover key={code} placement="bottom" content={() => categoryDetail(category.children)}>
                <span
                  className={`filterItem-category ${(currentCode && currentCode.slice(0, 1)) === code ? 'active' : ''}`}
                  onClick={() => handleFilterClick('category', { code, label: name })}
                >
                  {name}
                </span>
              </Popover>
            );
          })}
        </div>
        <div className={'filterItem'}>
          <label className={'filterItem-label'}>法律状态：</label>
          <span className={`filterItem-category ${filteredCategory.status.code ? '' : 'active'}`}>全部</span>
          {Object.typedKeys(PATENT_STATUS.label).map((key) => {
            const label = PATENT_STATUS.label[key];
            const code = key;
            return (
              <span
                onClick={() => handleFilterClick('status', { code, label })}
                key={code}
                className={`filterItem-category ${filteredCategory.status.code === code ? 'active' : ''}`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </FilterSection>
    </Wrapper>
  );
};

export default FilterBar;
