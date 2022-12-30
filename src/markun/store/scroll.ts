import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState: {
  isScrollSync: boolean;
  tree: any;
  scrollingOwner: 'editor' | 'viewer' | '';
} = {
  isScrollSync: true,
  tree: {},
  scrollingOwner: ''
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setTree(state, action) {
      state.tree = action.payload || {};
    },
    setScrollingOwner(state, action) {
      state.scrollingOwner = action.payload || '';
    },
    setIsScrollSync(state, action) {
      state.isScrollSync = action.payload;
    }
  }
});

export const { setTree, setScrollingOwner, setIsScrollSync } = scrollSlice.actions;

export const store = configureStore({
  reducer: scrollSlice.reducer
});

// // 可以订阅 store
// store.subscribe(() => console.log(store.getState()));

// // 将我们所创建的 action 对象传递给 `dispatch`
// store.dispatch(incremented());
// // {value: 1}
// store.dispatch(incremented());
// // {value: 2}
// store.dispatch(decremented());
// // {value: 1}
