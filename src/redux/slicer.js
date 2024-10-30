import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: undefined,
  user: undefined
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, removeToken, setUser } = AuthSlice.actions;

// Thunk action to handle AsyncStorage operations
export const loadToken = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    const user = await AsyncStorage.getItem('@user');
    if (token !== null) {
      dispatch(setToken(token));
    }
    if (user !== null) {
      dispatch(setUser(JSON.parse(user)));
    }
  } catch (error) {
    console.error('Error loading token from AsyncStorage:', error);
  }
};

// Async action to add token
export const addToken = (token, user) => async (dispatch) => {
  try {

    console.log(user, 'from slicer')
    
    await AsyncStorage.setItem('@user_token', token);

    await AsyncStorage.removeItem('@user');
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    dispatch(setToken(token));
    dispatch(setUser(user));
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

// Async action to remove token
export const removeTokenAsync = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('@user_token');
    await AsyncStorage.removeItem('@user');
    dispatch(removeToken());
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};

export default AuthSlice.reducer;
