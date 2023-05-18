import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const actionRooster = [fetchContacts, addContact, deleteContact];

const getActions = type =>
  actionRooster.map(act => {
    return act[type];
  });

getActions('pending');

export const conSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        console.log(`1`);
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.items = state.items.filter(ret => ret.id !== payload.id);
      })
      .addMatcher(isAnyOf(...getActions('pending')), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...getActions('rejected')), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addMatcher(isAnyOf(...getActions('fulfilled')), state => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    onFilter: (state, action) => {
      return (state = action.payload);
    },
  },
});

console.log(conSlice);

export const { onFilter } = filterSlice.actions;
export const contactsReducers = conSlice.reducer;
