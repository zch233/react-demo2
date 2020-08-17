import React from 'react';
import { CategoryDialogWrapper } from './HeaderStyles';
import AliIcon from '../../../components/AliIcon';

const CategoryDialog: React.FC = () => {
  return (
    <CategoryDialogWrapper>
      <ul className={'mainCategory'}>
        <li className={'mainCategory-item'}>
          <AliIcon className={'icon'} icon="categoryA" />
          <span>A-人类生活必须</span>
          <AliIcon className={'right'} icon="rightFill" />
        </li>
        <li className={'mainCategory-item'}>
          <AliIcon className={'icon'} icon="categoryA" />
          <span>A-人类生活必须</span>
          <AliIcon className={'right'} icon="rightFill" />
        </li>
        <li className={'mainCategory-item'}>
          <AliIcon className={'icon'} icon="categoryA" />
          <span>A-人类生活必须</span>
          <AliIcon className={'right'} icon="rightFill" />
        </li>
      </ul>
    </CategoryDialogWrapper>
  );
};

export default CategoryDialog;
