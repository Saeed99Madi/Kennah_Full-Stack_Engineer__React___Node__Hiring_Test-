import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITasks } from "@/types/tasks";
import axiosInstance from "@/utils/axios";

interface TaskState {
  tasks: ITasks[];
  currentTask: ITasks | null;
  loading: boolean;
  error: string | null;
  open: boolean;
  loader: boolean;
  CLoading: boolean;
  editMode: boolean;
  refetch: boolean;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  open: false,
  loader: false,
  CLoading: false,
  editMode: false,
  refetch: false,
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: ITasks, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/tasks", task);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/tasks");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const compleatTask = createAsyncThunk(
  "tasks/compleatTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/tasks/${taskId}`, {
        completed: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/tasks/${taskId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task: ITasks, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/tasks/${task._id}`, task);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchToDaysTasks = createAsyncThunk(
  "tasks/fetchToDaysTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/tasks/today");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/tasks/${taskId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const unCompleatTask = createAsyncThunk(
  "tasks/unCompleatTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/tasks/un-complete/${taskId}`,
        {
          completed: false,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchCompletedTasks = createAsyncThunk(
  "tasks/fetchCompletedTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/tasks/completed");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.open = true;
    },
    handleClose: (state) => {
      state.open = false;
    },
    handleClear: (state) => {
      state.currentTask = {
        title: "",
        description: "",
        dueDate: new Date(),
      };
    },
    setEditTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    Refetch: (state) => {
      state.refetch = !state.refetch;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loader = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload as string;
      })
      .addCase(compleatTask.pending, (state) => {
        state.CLoading = true;
        state.error = null;
      })
      .addCase(compleatTask.fulfilled, (state, action) => {
        state.CLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task._id != action.payload._id,
        );
      })
      .addCase(compleatTask.rejected, (state, action) => {
        state.CLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.CLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.CLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task._id != action.payload._id,
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.CLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchToDaysTasks.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(fetchToDaysTasks.fulfilled, (state, action) => {
        state.loader = false;
        state.tasks = action.payload;
      })
      .addCase(fetchToDaysTasks.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(unCompleatTask.pending, (state) => {
        state.CLoading = true;
        state.error = null;
      })
      .addCase(unCompleatTask.fulfilled, (state, action) => {
        state.CLoading = false;
        state.tasks = action.payload;
      })
      .addCase(unCompleatTask.rejected, (state, action) => {
        state.CLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  handleOpen,
  handleClose,
  handleClear,
  setEditTask,
  setEditMode,
  Refetch,
} = TaskSlice.actions;

export default TaskSlice.reducer;
