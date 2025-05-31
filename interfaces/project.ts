export interface Project {
    id: string;
    name: string;
    members: {
      name: string;
      color: string;
    }[];
    notes: string;
  }
  