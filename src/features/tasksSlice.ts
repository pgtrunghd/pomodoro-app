import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id?: number;
  name: string;
  isDone?: boolean;
}

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("http://localhost:3000/task");

  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: Task) => {
    const response = await axios.post("http://localhost:3000/tasks", newTask);

    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    const response = await axios.delete(`http://localhost:3000/tasks/${id}`);

    return response.data;
  }
);

export const deleteTaskAll = createAsyncThunk(
  "tasks/deleteTaskAll",
  async () => {
    const response = await axios.post("http://localhost:3000/tasks/delete-all");

    return response.data;
  }
);

export const deleteFinishedTasks = createAsyncThunk(
  "tasks/deleteFinishedTasks",
  async () => {
    const response = await axios.post(
      "http://localhost:3000/tasks/delete-finished"
    );

    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await axios.put(
      `http://localhost:3000/tasks/${task.id}`,
      task
    );
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch Tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });

    // Add Task
    builder
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add task";
      });

    // Delete Task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.status = "succeeded";
        // state.tasks = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete task";
      });

    // Update Task
    builder
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update task";
      });

    // Delete Task All
    builder
      .addCase(deleteTaskAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAll.fulfilled, (state) => {
        state.status = "succeeded";
        state.tasks = [];
      })
      .addCase(deleteTaskAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete all tasks";
      });

    // Delete Finished Tasks
    builder
      .addCase(deleteFinishedTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFinishedTasks.fulfilled, (state) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => !task.isDone);
      })
      .addCase(deleteFinishedTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete finished tasks";
      });
  },
});

export default tasksSlice.reducer;
