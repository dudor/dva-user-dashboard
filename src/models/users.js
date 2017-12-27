import * as usersService from '../services/users'
import { remove } from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total }
    }
  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page })
      yield put({ type: 'save', payload: { data, total: 10 } })
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id)
      const page = yield select(state => state.users.page)
      yield put({ type: 'fetch', payload: { page } })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query })
        }
      }
      );
    }
  },
};
