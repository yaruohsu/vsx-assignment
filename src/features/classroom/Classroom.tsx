import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks"
import {
  getClassAsync,
} from './classroomSlice';


export const Classroom = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getClassAsync())
  }, []);

  return (
    <div>
      Classroom Landing Page
    </div>
  );

}