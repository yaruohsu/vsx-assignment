import type { Class } from './classroomSlice';
import classData from '../../contents/class.json';

export const fetchClass = () => {
  return new Promise<{ data: Class }>(resolve =>
    setTimeout(() => resolve({ data: classData }), 500),
  )
}
