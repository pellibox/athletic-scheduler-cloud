
import React, { useRef, useState } from "react";
import { TimeSlot } from "../time-slot/TimeSlot";
import { PersonData, ActivityData } from "../types";
import { isTimeSlotOccupied } from "./CourtStyleUtils";
import { HorizontalTimeNav } from "./HorizontalTimeNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourtScheduleViewProps {
  courtId: string;
  courtName: string;
  courtNumber: number;
  timeSlots: string[];
  occupants: PersonData[];
  activities: ActivityData[];
  onDrop: (courtId: string, person: PersonData, position?: { x: number, y: number }, timeSlot?: string) => void;
  onActivityDrop: (courtId: string, activity: ActivityData, timeSlot?: string) => void;
  onRemovePerson: (personId: string, timeSlot?: string) => void;
  onRemoveActivity: (activityId: string, timeSlot?: string) => void;
}

export function CourtScheduleView({
  courtId,
  courtName,
  courtNumber,
  timeSlots,
  occupants,
  activities,
  onDrop,
  onActivityDrop,
  onRemovePerson,
  onRemoveActivity
}: CourtScheduleViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeHour, setActiveHour] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const getOccupantsForTimeSlot = (time: string) => {
    return occupants.filter(person => 
      isTimeSlotOccupied(person, time, timeSlots) || 
      (person.timeSlot === time) || 
      (!person.timeSlot && time === timeSlots[0])
    );
  };

  const getActivitiesForTimeSlot = (time: string) => {
    return activities.filter(activity => 
      isTimeSlotOccupied(activity, time, timeSlots) ||
      (activity.startTime === time) || 
      (!activity.startTime && time === timeSlots[0])
    );
  };

  const scrollToTimeSlot = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < timeSlots.length) {
      const timeSlotElements = scrollContainerRef.current.querySelectorAll('.border-b.border-gray-200');
      if (timeSlotElements[index]) {
        timeSlotElements[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHourNavigation = (hour: string) => {
    const targetIndex = timeSlots.findIndex(slot => slot.startsWith(hour));
    if (targetIndex !== -1) {
      scrollToTimeSlot(targetIndex);
      setActiveHour(hour);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Court name header - more space and prominence */}
      <div className="py-2 px-3 bg-white bg-opacity-90 z-30 border-b border-gray-200 text-center mb-1">
        <h3 className="font-bold text-lg truncate">
          {courtName} <span className="text-sm font-medium">#{courtNumber}</span>
        </h3>
      </div>
      
      {/* Floating time navigation - positioned absolutely within the court */}
      <div className="absolute right-1 top-12 z-40">
        <div className="time-nav-floating">
          {timeSlots.map((slot) => {
            const hour = slot.split(':')[0];
            return (
              <button
                key={`nav-${hour}`}
                className={`time-selection-button ${
                  activeHour === hour ? 'bg-ath-red-clay/10 text-ath-red-clay font-semibold' : ''
                }`}
                onClick={() => handleHourNavigation(hour)}
              >
                {hour}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-1 relative">
        {/* Time labels column - always visible but smaller on mobile */}
        <div className={`${isMobile ? 'w-12' : 'w-16'} z-20 flex flex-col`}>
          {timeSlots.map((time) => (
            <div key={`time-label-${time}`} className={`${isMobile ? 'h-[75px]' : 'h-[90px]'} flex items-center`}>
              <div className={`bg-white ${isMobile ? 'px-1 py-0.5 text-[10px]' : 'px-1.5 py-1 text-xs'} font-semibold rounded shadow-sm`}>
                {time}
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={scrollContainerRef} 
          className="flex-1 overflow-auto h-full relative ml-1 md:ml-2 position-relative"
        >
          <div className="min-h-full pb-16">
            {timeSlots.map((time) => (
              <TimeSlot
                key={`${courtId}-${time}`}
                courtId={courtId}
                time={time}
                occupants={getOccupantsForTimeSlot(time)}
                activities={getActivitiesForTimeSlot(time)}
                onDrop={onDrop}
                onActivityDrop={onActivityDrop}
                onRemovePerson={onRemovePerson || (() => {})}
                onRemoveActivity={onRemoveActivity || (() => {})}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
