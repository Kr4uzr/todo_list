export interface Tasks {
  id: number;
  status: string;
  description: string;
  dateCreated: Date | string;
  dateFinished?: Date | string | null;
}
