import React, { useCallback, useEffect, useState } from 'react';
import { CategoryDetailWrapper, FilterSection, UserFilter, Wrapper } from './FilterStyles';
import AliIcon from '../../components/AliIcon';
import { Popover, Tag } from 'antd';
import categories, { flatCategories } from '../../utils/categories';
import { PATENT_CERT_STATUS, PATENT_TYPE } from '../../utils/dict';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

type typeFiltered = {
  code?: '1' | '2' | '3';
  label?: string;
};
type categoryFiltered = {
  code?: string;
  label?: string;
};
type certStatusFiltered = {
  code?: '0' | '1' | '2';
  label?: string;
};
type FilteredCategory = {
  type: typeFiltered;
  category: categoryFiltered;
  certStatus: certStatusFiltered;
};

const initFilteredCategory = { type: {}, category: {}, certStatus: {} };
const FilterBar: React.FC = () => {
  const history = useHistory();
  const [popoverVisible, setPopoverVisible] = useState(
    (() => {
      const temp: { [key: string]: boolean } = {};
      categories.map((category) => (temp[category.code] = false));
      return temp;
    })()
  );
  const [filteredCategory, setFilteredCategory] = useState<FilteredCategory>(initFilteredCategory);
  const [filterControl, setFilterControl] = useState({
    visible: true,
    text: '收起筛选',
    icon: 'top',
  });
  const handleFilterControl = useCallback(() => {
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
  }, [filterControl]);
  const handleFilterClick = useCallback(
    (key: keyof FilteredCategory, data: typeFiltered | categoryFiltered | certStatusFiltered) => {
      const newFilteredCategory = { ...filteredCategory, [key]: data };
      setFilteredCategory(newFilteredCategory);
      history.push(
        `/patent?${Object.typedKeys(newFilteredCategory)
          .map((key) => newFilteredCategory[key].code && `${key}=${newFilteredCategory[key].code}`)
          .filter(Boolean)
          .join('&')}`
      );
      key === 'category' && data.code && setPopoverVisible({ ...popoverVisible, [data.code.slice(0, 1)]: false });
    },
    [filteredCategory, history, popoverVisible]
  );
  const categoryDetail = useCallback(
    (subCategories: SubCategory[]) => (
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
    ),
    [handleFilterClick]
  );
  const handleAllCategoryClick = useCallback(() => {
    setFilteredCategory(initFilteredCategory);
    history.push('/patent');
  }, [history]);
  useEffect(() => {
    const { type, category, certStatus } = queryString.parse(window.location.search) as {
      type?: '1' | '2' | '3';
      certStatus?: '0' | '1' | '2';
      category?: string;
    };
    setFilteredCategory({
      type: type ? { code: type, label: PATENT_TYPE.label[type] } : {},
      category: category ? { code: category, label: flatCategories[category] } : {},
      certStatus: certStatus ? { code: certStatus, label: PATENT_CERT_STATUS.label[certStatus] } : {},
    });
  }, []);
  return (
    <Wrapper className={'pageWidthWithCenter'}>
      <UserFilter>
        <div className={'filterText'}>
          <span className={'allCategory'} onClick={handleAllCategoryClick}>
            所有分类
            <AliIcon icon={'right'} />
          </span>
          {Object.typedKeys(filteredCategory)
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
          <AliIcon icon={filterControl.icon} />
        </div>
      </UserFilter>
      <FilterSection className={filterControl.visible ? '' : 'hide'}>
        <div className={'filterItem'}>
          <label className={'filterItem-label'}>专利类型：</label>
          <span className={`filterItem-category ${filteredCategory.type.code ? '' : 'active'}`} onClick={() => handleFilterClick('type', {})}>
            全部
          </span>
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
          <span className={`filterItem-category ${filteredCategory.category.code ? '' : 'active'}`} onClick={() => handleFilterClick('category', {})}>
            全部
          </span>
          {categories.map((category) => {
            const { code, name } = category;
            const currentCode = filteredCategory.category.code;
            return (
              <Popover
                key={code}
                placement="bottom"
                visible={popoverVisible[code]}
                onVisibleChange={(visible) => setPopoverVisible({ ...popoverVisible, [category.code]: visible })}
                content={() => categoryDetail(category.children)}
              >
                <span
                  key={code}
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
          <span className={`filterItem-category ${filteredCategory.certStatus.code ? '' : 'active'}`} onClick={() => handleFilterClick('certStatus', {})}>
            全部
          </span>
          {Object.typedKeys(PATENT_CERT_STATUS.label).map((key) => {
            const label = PATENT_CERT_STATUS.label[key];
            const code = key;
            return (
              <span
                onClick={() => handleFilterClick('certStatus', { code, label })}
                key={code}
                className={`filterItem-category ${filteredCategory.certStatus.code === code ? 'active' : ''}`}
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
