import {createSlice, createAsyncThunk} from  "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../Components/Post/Post";
import {IPost} from "../Interfaces/IPost";
import {IReimbursement} from "../Interfaces/IPost";

interface PostSliceState{
    loading: boolean,
    error: boolean,
    posts?: IPost[]
}

const initialPostState: PostSliceState = {
    loading: false,
    error: false
};

export const getReimbursements = createAsyncThunk(
  "employee/reimbursements",
  async (thunkAPI) => {
      try{
          axios.defaults.withCredentials = true;
          const res = await axios.get("http://localhost:8080/employee/reimbursements");

          return res.data;
      } catch (e){
          console.log(e);
      }
  }  
);

export const CreateReimbursementRequest = createAsyncThunk(
    "employee/request",
    async (newRequest:any, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.put("http://localhost:8080/employee/request", newRequest);

            return newRequest;
        } catch (e){
            console.log(e);
        }
    }
)

export const PostSlice = createSlice({
    name: 'posts',
    initialState: initialPostState,
    reducers: {
        clearPosts: (state) => {
            state.posts = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getReimbursements.pending, (state, action)=> {
            state.loading = true;
        });

        builder.addCase(getReimbursements.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = false;
        });

        builder.addCase(getReimbursements.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(CreateReimbursementRequest.fulfilled, (state, action) => {
            if(state.posts && action.payload){
                state.posts = [action.payload, ...state.posts];
            }
        });
    }
});

export const {clearPosts} = PostSlice.actions;

export default PostSlice.reducer;