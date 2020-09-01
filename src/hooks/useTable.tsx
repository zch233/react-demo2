import { Tooltip, Button, Table, Divider, Popover, Checkbox, message } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AliIcon from '../components/AliIcon';
import * as api from '../pages/Patent/api';
import { ColumnsType } from 'antd/es/table';
import { ColumnTitle } from 'antd/es/table/interface';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Link } from 'react-router-dom';
import { PATENT_TYPE } from '../utils/dict';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { downloadFile } from '../utils';
import { StoreContext } from '../store';

const Wrapper = styled.div`
  background-color: #fff;
  .dangerButton {
    font-size: 12px;
  }
  .patentLink {
    font-size: 14px;
    color: #333;
    &:hover {
      color: #23527c;
    }
    .tags {
      position: relative;
      color: #fff;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transform: scale(0.8);
      top: -0.6em;
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.5);
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 6px;
        height: 6px;
        transform: skew(-50deg);
        border-radius: 40%;
      }
      &.today {
        background-color: rgb(208, 51, 34);
        &::after {
          background-color: rgb(208, 51, 34);
        }
      }
      &.yesterday {
        background-color: rgb(51, 122, 183);
        &::after {
          background-color: rgb(51, 122, 183);
        }
      }
    }
  }
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
type FetchData = {
  no?: number;
  size?: number;
};
const useTable = ({ title }: Options) => {
  const history = useHistory();
  const location = useLocation();
  const highlightKeyword = useCallback((text: string) => {
    const { word } = queryString.parse(window.location.search) as { word?: string };
    const wordArr = word ? word.split(/[,，+\s\\/|-]/).filter(Boolean) : [];
    let __html = text;
    wordArr.map((item) => (__html = __html.replace(new RegExp(item, 'g'), `<em class="searchKeyword">${item}</em>`)));
    return <span dangerouslySetInnerHTML={{ __html }} />;
  }, []);
  const getFullDate = useCallback((date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`, []);
  const isToday = useCallback((date: string) => getFullDate(new Date()) === getFullDate(new Date(date)), [getFullDate]);
  const isYesterday = useCallback((date: string) => getFullDate(new Date(Date.now() - 3600 * 1000 * 24)) === getFullDate(new Date(date)), [getFullDate]);
  const initColumn: ColumnsType<Patent> = [
    {
      title: '专利号',
      dataIndex: 'number',
      render: (number) => <span>{highlightKeyword(number)}</span>,
    },
    {
      title: '专利名称',
      dataIndex: 'name',
      render: (name, patent) => (
        <Link className={'patentLink'} to={`/patent/${patent.number}`}>
          {highlightKeyword(name)}
          {(isToday(patent.createTime) || isYesterday(patent.createTime)) && (
            <span className={`tags ${isToday(patent.createTime) ? 'today' : isYesterday(patent.createTime) ? 'yesterday' : ''}`}>
              {isToday(patent.createTime) ? '今' : isYesterday(patent.createTime) ? '昨' : ''}
            </span>
          )}
        </Link>
      ),
    },
    {
      title: '领域',
      dataIndex: 'tags',
      render: (tags) =>
        tags.split(',').map((tag: string) => (
          <Link style={{ color: 'inherit' }} key={tag} to={`/patent?word=${tag}`}>
            {highlightKeyword(tag)},
          </Link>
        )),
    },
    {
      title: '法律状态',
      dataIndex: 'legalStatus',
    },
    {
      title: '专利类型',
      dataIndex: 'type',
      render: (type: number) => <span>{PATENT_TYPE.label[type.toString() as '1' | '2' | '3']}</span>,
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
      render: (vipPrice) => <span>￥{vipPrice}</span>,
    },
    {
      title: '操作',
      dataIndex: 'options',
      render: (_, { id }) => (
        <Link to={`/order/confirm?commodityId=${id}`}>
          <Button className={'dangerButton'} type="primary" size={'small'} danger>
            立即购买
          </Button>
        </Link>
      ),
    },
  ];
  const { state } = useContext(StoreContext);
  const [pageKey, setPageKey] = useState(0);
  const [tableData, setTableData] = useState<Patent[]>([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(initColumn);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const defaultCheckedList: ColumnTitle<Patent>[] = useMemo(() => initColumn.map((column: any) => column.checked !== false && column.title).filter(Boolean), [
    initColumn,
  ]);
  const plainOptions = useMemo(() => initColumn.map((column) => column.title), [initColumn]);
  const [filterData, setFilterData] = useState({
    checkAll: defaultCheckedList.length === initColumn.length,
    indeterminate: false,
    checkedList: defaultCheckedList,
  });
  const handleRefresh = useCallback(() => {
    setPageKey(pageKey + 1);
  }, [pageKey]);
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
  const getPatents = useCallback(async (fetchData?: FetchData) => {
    setLoading(true);
    const { data } = await api.getPatents({ size: 30, ...fetchData }).finally(() => setLoading(false));
    setTotal(data.totalCount);
    setPageSize(data.size);
    setTableData(data.list);
  }, []);
  const exportPatent = useCallback((type: 'all' | 'result') => {
    downloadFile('/patent/patent-export' + (type === 'all' ? '' : window.location.search));
    message.success('导出成功！');
  }, []);
  useEffect(() => {
    getPatents(queryString.parse(location.search));
  }, [location, getPatents, pageKey]);
  const table = (
    <Wrapper>
      <TableOptions>
        <label>{title}</label>
        <div className={'options'}>
          {state.user.account && (
            <>
              <Button className={'exportAll'} type="primary" size={'small'} onClick={() => exportPatent('all')}>
                导出全部
              </Button>
              <Button className={'exportResult'} type="primary" size={'small'} onClick={() => exportPatent('result')}>
                导出结果
              </Button>
              <Divider type="vertical" />
            </>
          )}
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
        loading={loading}
        className={'myTable'}
        rowKey={'number'}
        columns={columns}
        dataSource={tableData}
        size={'small'}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          pageSize: pageSize,
          showTotal: (total) => `共 ${total} 件`,
          onChange: (page, pageSize) => history.push(`/patent?no=${page}&size=${pageSize}`),
          onShowSizeChange: (page, pageSize) => history.push(`/patent?no=${page}&size=${pageSize}`),
          total: total,
        }}
      />
    </Wrapper>
  );
  return { table };
};

export default useTable;
