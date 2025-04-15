import { createSlice } from '@reduxjs/toolkit';
import { ITasks } from '@/types/tasks';

interface UserState {
  tasks: ITasks[];
  currentTask: ITasks | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
};


const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},

});

export default TaskSlice.reducer;
