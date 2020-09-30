import { getUserProfile } from "../../api/github";
import { createAsyncThunk } from "../../utils/createAsyncThunk";
import { getUserProfileAsync } from "./actions";

export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
);
