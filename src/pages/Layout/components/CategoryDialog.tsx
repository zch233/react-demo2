import React, { useCallback } from 'react';
import { CategoryDialogWrapper } from './HeaderStyles';
import AliIcon from '../../../components/AliIcon';
import categories from '../../../utils/categories';
import { useHistory } from 'react-router-dom';

type Params = {
  category: string;
  subCategory?: string;
};
type Props = {
  className?: string;
  setPopoverVisible: (value: boolean) => void;
};
const CategoryDialog: React.FC<Props> = ({ setPopoverVisible }) => {
  const history = useHistory();
  const handleCategoryClick = useCallback(
    (params: Params) => {
      history.push(
        `/patent?${Object.typedKeys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')}`
      );
      setPopoverVisible(false);
    },
    [history, setPopoverVisible]
  );
  return (
    <CategoryDialogWrapper>
      <ul className={'mainCategory'}>
        {categories.map((category) => (
          <li key={category.id} className={'mainCategory-item'} onClick={() => handleCategoryClick({ category: category.code })}>
            <AliIcon className={'icon'} icon={`category${category.code}`} />
            <span className={'name'}>{category.name}</span>
            <AliIcon className={'right'} icon="rightFill" />
            <div className={'detailCategory'}>
              {category.children.map((child) => (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick({ category: category.code, subCategory: child.code });
                  }}
                  key={child.id}
                  className={'detailCategory-item'}
                >
                  {child.name}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </CategoryDialogWrapper>
  );
};

export default CategoryDialog;
