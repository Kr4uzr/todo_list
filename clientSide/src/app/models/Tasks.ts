export interface Tasks {
  id: number;
  status: string;
  description: string;
  dateCreated: string;
  dateFinished?: string | null;
}
