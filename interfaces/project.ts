export interface Member {
    name: string;
    color: string;
  }
  
  export interface Project {
    id: string;
    name: string;
    members: Member[];
    notes: string;
  }
  