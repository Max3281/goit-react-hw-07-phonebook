import { configureStore } from '@reduxjs/toolkit';

import { contactsReducers, filterSlice } from './slice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducers,
    filter: filterSlice.reducer,
  },

  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});
