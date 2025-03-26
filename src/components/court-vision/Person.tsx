
import { PersonData } from "./types";
import { PersonCard } from "./PersonCard";

interface PersonProps {
  person: PersonData;
  onRemove?: () => void;
  onAddToDragArea?: (person: PersonData) => void;
  programs?: any[];
}

export function Person({ person, onRemove, onAddToDragArea, programs = [] }: PersonProps) {
  // Simple wrapper component that passes props to PersonCard
  return (
    <PersonCard
      person={person}
      programs={programs}
      onRemove={onRemove}
      onAddToDragArea={onAddToDragArea}
    />
  );
}
