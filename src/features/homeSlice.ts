import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the state type
interface HomeState {
  count: number;
  value: number;
  isLogin:boolean;
}
const initialState:HomeState = {
  count: 0,
  value: 0,
  
/*   Signup/in  */
  isLogin:false
}

export const homeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload; // Action payload is strictly typed as `number`
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = homeSlice.actions

export default homeSlice