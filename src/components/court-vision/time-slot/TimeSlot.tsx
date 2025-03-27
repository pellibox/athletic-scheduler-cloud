
import React, { useRef } from "react";
import { PersonData, ActivityData } from "../types";
import { TimeSlotOccupants } from "./TimeSlotOccupants";
import { TimeSlotActivities } from "./TimeSlotActivities";
import { TimeSlotDropArea } from "./TimeSlotDropArea";
import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeSlotProps {
  courtId: string;
  time: string;
  occupants: PersonData[];
  activities: ActivityData[];
  onDrop: (courtId: string, person: PersonData, position?: { x: number, y: number }, timeSlot?: string) => void;
  onActivityDrop: (courtId: string, activity: ActivityData, timeSlot?: string) => void;
  onRemovePerson: (personId: string, time?: string) => void;
  onRemoveActivity: (activityId: string, time?: string) => void;
  hasConflicts?: boolean;
  isHourStart?: boolean;
}

export function TimeSlot({ 
  courtId, 
  time, 
  occupants, 
  activities, 
  onDrop, 
  onActivityDrop, 
  onRemovePerson, 
  onRemoveActivity,
  hasConflicts = false,
  isHourStart = false
}: TimeSlotProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate if this is a primary time slot (where an assignment starts)
  const hasPrimaryAssignments = occupants.some(p => p.timeSlot === time) || 
                               activities.some(a => a.startTime === time);
  
  // Determine background color based on state
  let bgColor = "";
  if (hasConflicts) {
    bgColor = "bg-orange-50"; // Conflicts in orange
  } else if (hasPrimaryAssignments) {
    bgColor = "bg-green-50/50"; // Confirmed assignments in soft green
  } else if (occupants.length > 0 || activities.length > 0) {
    bgColor = "bg-blue-50/20"; // Continuation slots in very light blue
  }

  return (
    <div 
      className={`relative flex border-b ${
        isHourStart ? 'border-gray-300' : 'border-gray-100'
      } py-1 h-[110px] ${bgColor} transition-colors duration-200 ${
        isHourStart ? 'border-t-2 border-t-gray-300' : ''
      }`}
    >
      {hasConflicts && (
        <div className="absolute right-2 top-1 z-30">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </div>
      )}
      
      <div className="flex-1 px-1 relative">
        <div className="relative h-full">
          <div 
            ref={scrollContainerRef} 
            className="h-full overflow-auto relative flex items-center"
          >
            <TimeSlotOccupants 
              occupants={occupants} 
              onRemovePerson={onRemovePerson}
              time={time}
            />
            <TimeSlotActivities 
              activities={activities} 
              onRemoveActivity={onRemoveActivity}
              time={time}
            />
          </div>
        </div>
        
        <TimeSlotDropArea 
          courtId={courtId}
          time={time}
          onDrop={onDrop}
          onActivityDrop={onActivityDrop}
        />
      </div>
    </div>
  );
}
