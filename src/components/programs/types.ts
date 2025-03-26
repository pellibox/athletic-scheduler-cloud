
export interface ProgramDetail {
  id: string;
  name: string;
  color: string;
  description?: string;
  details?: string[];
  cost?: string;
  weeklyHours?: number;
  totalWeeks?: number;
  vicki?: boolean | string;
  nextStart?: string;
  enrollmentOpen?: boolean;
}

export interface ProgramCardProps {
  program: ProgramDetail;
  expandedProgram: string | null;
  toggleExpand: (id: string) => void;
  onUpdateProgram?: (updatedProgram: ProgramDetail) => void;
}
