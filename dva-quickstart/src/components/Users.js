import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm } from 'antd'
import { stringify } from 'query-string'
import { routerRedux } from 'dva/router'
import styles from './Users.css'
import { PAGE_SIZE } from '../constants'
import UserModal from './UserModal'

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      search: stringify({ page })
    }))
  }
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="">Edit</a>
          </UserModal>
          <Popconfirm title={`Confirm to delete ${record.name}?`} onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ]
  return (
    <div className={styles.normal}>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  const { list, total, page } = state.users
  return {
    loading: state.loading.global,
    list,
    total,
    page,
  }
}
export default connect(mapStateToProps)(Users)