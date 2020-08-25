import { Tooltip, Button, Table, Divider, Popover, Checkbox } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AliIcon from '../components/AliIcon';
import * as api from '../pages/Patent/api';
import { ColumnsType } from 'antd/es/table';
import { ColumnTitle } from 'antd/es/table/interface';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';

const Wrapper = styled.div`
  background-color: #fff;
`;
const TableOptions = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .exportResult {
    margin: 0 5px;
  }
  label {
    font-size: 16px;
  }
  .options {
    svg {
      font-size: 16px;
      cursor: pointer;
      margin: 0 5px;
    }
  }
`;
type Options = {
  title: string;
};
const useTable = ({ title }: Options) => {
  const initColumn: ColumnsType<Patent> = [
    {
      title: '专利号',
      dataIndex: 'number',
    },
    {
      title: '专利名称',
      dataIndex: 'name',
    },
    {
      title: '领域',
      dataIndex: 'tags',
    },
    {
      title: '法律状态',
      dataIndex: 'legalStatus',
    },
    {
      title: '专利类型',
      dataIndex: 'type',
    },
    {
      title: '发明人',
      dataIndex: 'inventorExplain',
    },
    {
      title: '零售价格',
      dataIndex: 'price',
      render: (price) => <span>￥{price}</span>,
    },
    {
      title: 'VIP价格',
      dataIndex: 'vipPrice',
    },
    {
      title: '操作',
      dataIndex: 'options',
    },
  ];
  const [tableData, setTableData] = useState<Patent[]>([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [columns, setColumns] = useState(initColumn);
  const defaultCheckedList: ColumnTitle<Patent>[] = useMemo(() => initColumn.map((column: any) => column.checked !== false && column.title).filter(Boolean), [
    initColumn,
  ]);
  const plainOptions = useMemo(() => initColumn.map((column) => column.title), [initColumn]);
  const [filterData, setFilterData] = useState({
    checkAll: defaultCheckedList.length === initColumn.length,
    indeterminate: false,
    checkedList: defaultCheckedList,
  });
  const handleRefresh = () => {};
  const onCheckAllChange = useCallback(
    (hasCheckAll: boolean) => {
      const checkedList = hasCheckAll ? plainOptions : [];
      setFilterData({
        checkAll: hasCheckAll,
        indeterminate: false,
        checkedList,
      });
      setColumns(checkedList.map((item) => initColumn.filter((v) => v.title === item)).map((v) => v[0]));
    },
    [initColumn, plainOptions]
  );
  const onChange = useCallback(
    (checkedList: any[]) => {
      setFilterData({
        indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
        checkAll: checkedList.length === plainOptions.length,
        checkedList,
      });
      setColumns(checkedList.map((item) => initColumn.filter((v) => v.title === item)).map((v) => v[0]));
    },
    [initColumn, plainOptions]
  );
  const filterCardTitle = useMemo(
    () => (
      <Checkbox
        indeterminate={filterData.indeterminate}
        onChange={(e) => (e.target.checked ? onCheckAllChange(true) : onCheckAllChange(false))}
        checked={filterData.checkAll}
      >
        列展示
      </Checkbox>
    ),
    [filterData, onCheckAllChange]
  );
  const filterCardContent = useMemo(
    () => (
      <Checkbox.Group
        style={{ maxWidth: 400 }}
        options={plainOptions as CheckboxOptionType[]}
        value={filterData.checkedList as CheckboxValueType[]}
        onChange={onChange}
      />
    ),
    [plainOptions, filterData, onChange]
  );
  useEffect(() => {
    const fn = () => setFullScreen(!!(document.fullscreenElement && document.fullscreenElement === document.body));
    document.addEventListener('fullscreenchange', fn);
    return () => {
      document.removeEventListener('fullscreenchange', fn);
    };
  }, []);
  const getPatents = async () => {
    const { data } = await api.getPatents({});
    setTableData(data.list);
  };
  useEffect(() => {
    getPatents();
  }, []);
  const table = (
    <Wrapper>
      <TableOptions>
        <label>{title}</label>
        <div className={'options'}>
          <Button className={'exportAll'} type="primary" size={'small'}>
            导出全部
          </Button>
          <Button className={'exportResult'} type="primary" size={'small'}>
            导出结果
          </Button>
          <Divider type="vertical" />
          <Tooltip placement="top" title={'刷新列表'}>
            <span onClick={handleRefresh}>
              <AliIcon icon={'refresh'} />
            </span>
          </Tooltip>
          <Tooltip placement="top" title={'列设置'}>
            <Popover placement="bottomRight" content={filterCardContent} title={filterCardTitle} trigger="click">
              <span>
                <AliIcon icon={'settings'} />
              </span>
            </Popover>
          </Tooltip>
          {fullScreen ? (
            <Tooltip placement="top" title={'退出'}>
              <span onClick={() => document.exitFullscreen()}>
                <AliIcon icon={'exitFullScreen'} />
              </span>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title={'全屏'}>
              <span onClick={() => document.body.requestFullscreen()}>
                <AliIcon icon={'fullScreen'} />
              </span>
            </Tooltip>
          )}
        </div>
      </TableOptions>
      <Table<Patent>
        className={'myTable'}
        rowKey={'number'}
        columns={columns}
        dataSource={tableData}
        size={'small'}
        pagination={{ position: ['bottomCenter'] }}
      />
    </Wrapper>
  );
  return { table };
};

export default useTable;
