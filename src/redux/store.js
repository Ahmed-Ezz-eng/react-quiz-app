import { configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import questionsSlice from './reducers/questionsSlice';


const store = configureStore({
  reducer: {
    authSlice,
    questionsSlice,
  },
});

export default store;
