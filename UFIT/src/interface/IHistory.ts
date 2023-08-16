export interface IHistory {
  _id: string;
  sessionName: string;
  restDays: string;
  date: string;
  userId: string;
  programId: string;
  programName: string;
  movements: IMovement[];
  __v: number;
}

interface IMovement {
  section: string;
  movementName: string;
  _id: string;
}
