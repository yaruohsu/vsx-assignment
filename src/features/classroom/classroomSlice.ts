import { createAppSlice } from "../../app/createAppSlice"
import { fetchClass } from "./classroomAPI";

interface Student {
  name: string;
  score: number
  studentId: number | null;
}

export interface Class {
  name: string;
  id: string;
  url: string;
  students: Student[];
}


export interface ClassroomSliceState extends Class {
  status: "idle" | "loading" | "failed"
}

const initialState: ClassroomSliceState = {
  name: '',
  id: '',
  url: '',
  students: [],
  status: "idle",
}


export const classroomSlice = createAppSlice({
  name: "classroom",
  initialState,
  reducers: create => ({
    getClassAsync: create.asyncThunk(
      async () => {
        const response = await fetchClass()
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.name = action.payload.name
          state.id = action.payload.id
          state.url = action.payload.url
          state.students = action.payload.students
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),

  selectors: {},
})


export const { getClassAsync } =
  classroomSlice.actions