import React from 'react';
import styles from './Users.css';
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router'
import UserModal from './UserModal'


function Users({ dispatch, list: dataSource, loading, total, page: current }) {

  function createHandler(values) {
    dispatch({ type: 'users/create', payload: values });
  }

  function deleteHandler(id) {
    console.log("delete:" + id);
    dispatch({
      type: 'users/remove',
      payload: id
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/users',
        query: { page }
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>
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
            <a>Edit</a>
          </UserModal>
          &nbsp;
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ]

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
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
  );
}

function mapStateToProps(state) {
  console.log(state);
  const { list, total, page } = state.users;
  return { list, total, page, loading: state.loading.models.users }
}

export default connect(mapStateToProps)(Users)
