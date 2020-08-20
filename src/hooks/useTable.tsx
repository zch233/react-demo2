import { Tag, Space, Tooltip, Button, Table, Divider, Popover, Checkbox } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AliIcon from '../components/AliIcon';

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
  const initColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span>Invite {record.name}</span>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const [fullScreen, setFullScreen] = useState(false);
  const [columns, setColumns] = useState(initColumn);
  const defaultCheckedList: string[] = useMemo(() => initColumn.map((column: any) => column.checked !== false && column.title).filter(Boolean), [initColumn]);
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
  const filterCardTitle = (
    <Checkbox
      indeterminate={filterData.indeterminate}
      onChange={(e) => (e.target.checked ? onCheckAllChange(true) : onCheckAllChange(false))}
      checked={filterData.checkAll}
    >
      列展示
    </Checkbox>
  );
  const filterCardContent = <Checkbox.Group style={{ maxWidth: 400 }} options={plainOptions} value={filterData.checkedList} onChange={onChange} />;
  useEffect(() => {
    const fn = () => setFullScreen(!!(document.fullscreenElement && document.fullscreenElement === document.body));
    document.addEventListener('fullscreenchange', fn);
    return () => {
      document.removeEventListener('fullscreenchange', fn);
    };
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
      <Table columns={columns} dataSource={data} size={'small'} pagination={{ position: ['bottomCenter'] }} />
    </Wrapper>
  );
  return { table };
};

export default useTable;
