import React from 'react';
import { PatentListWrapper } from './PatentListStyles';
import useTable from '../../hooks/useTable';

const PatentList: React.FC = () => {
  const { table } = useTable({ title: '可售专利' });
  return <PatentListWrapper className={'pageWidthWithCenter'}>{table}</PatentListWrapper>;
};

export default PatentList;
