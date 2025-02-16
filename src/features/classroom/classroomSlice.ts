import { createSelector } from 'reselect';
import { createAppSlice } from "../../app/createAppSlice"
import { fetchClass } from "./classroomAPI";
import type { PayloadAction } from '@reduxjs/toolkit';
import { shuffleArray } from '../../utils/shuffleArray';
import { chunkArray } from '../../utils/chunkArray';

export interface Student {
  name: string;
  score: number
  id: number | null;
}

export interface Class {
  name: string;
  id: string;
  url: string;
  limit: number;
  students: Student[];
  studentGroups: Student[][];
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
  limit: 0,
  studentGroups: [],
}

export const classroomSlice = createAppSlice({
  name: "classroom",
  initialState,
  reducers: create => ({
    getClassAsync: create.asyncThunk(
      async () => {
        const response = await fetchClass();
        return response.data;
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.name = action.payload.name;
          state.id = action.payload.id;
          state.url = action.payload.url;
          state.students = action.payload.students;
          state.limit = action.payload.limit;

          const shuffleStudents = shuffleArray(action.payload.students.filter(student => student.id !== null));
          const studentGroups = chunkArray(shuffleStudents, 5);
          state.studentGroups = studentGroups;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    increaseScore: create.reducer(
      (state, action: PayloadAction<number>) => {
        const index = state.students.findIndex(student => student.id === action.payload);
        if (index !== -1) {
          const preStudentState = state.students[index];
          state.students[index] = {
            ...preStudentState,
            score: preStudentState.score + 1,
          };
        }
      },
    ),
    decreaseScore: create.reducer(
      (state, action: PayloadAction<number>) => {
        const index = state.students.findIndex(student => student.id === action.payload);
        if (index !== -1) {
          const preStudentState = state.students[index];
          state.students[index] = {
            ...preStudentState,
            score: preStudentState.score - 1,
          };
        }
      },
    ),
  }),


})

// action
export const { getClassAsync, increaseScore, decreaseScore } = classroomSlice.actions


// selector
const selectClassroom = (state: { classroom: ClassroomSliceState }) => state.classroom;

export const selectClassInfo = createSelector(
  [selectClassroom],
  (classroom) => ({
    name: classroom.name,
    link: classroom.url,
    id: classroom.id,
    limit: classroom.limit,
  })
);
export const selectStudents = createSelector(
  [selectClassroom],
  (classroom) => classroom.students
);

export const selectStudentGroup = createSelector(
  [selectClassroom],
  (classroom) => classroom.studentGroups
);



