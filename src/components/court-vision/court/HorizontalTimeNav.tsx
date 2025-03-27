
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

interface HorizontalTimeNavProps {
  timeSlots: string[];
  activeHour: string | null;
  onHourSelect: (hour: string) => void;
}

export function HorizontalTimeNav({
  timeSlots,
  activeHour,
  onHourSelect
}: HorizontalTimeNavProps) {
  const isMobile = useIsMobile();
  
  // Get unique hours from time slots
  const getUniqueHours = (slots: string[]) => {
    const uniqueHours = new Set(slots.map(slot => slot.split(':')[0]));
    return Array.from(uniqueHours).sort((a, b) => parseInt(a) - parseInt(b));
  };

  // Get all hours for timeline
  const hours = getUniqueHours(timeSlots);
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const hourIndex = value[0];
    if (hourIndex >= 0 && hourIndex < hours.length) {
      onHourSelect(hours[hourIndex]);
    }
  };
  
  // Get current hour index for slider
  const getCurrentHourIndex = () => {
    if (!activeHour) return 0;
    const index = hours.indexOf(activeHour);
    return index >= 0 ? index : 0;
  };

  return (
    <div className="w-full mb-1 space-y-2">
      {/* Hour buttons for quick selection */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0.5">
          {hours.map((hour) => {
            const isActive = activeHour === hour;
            const hourInt = parseInt(hour);
            const isPM = hourInt >= 12;
            const displayHour = hourInt > 12 ? hourInt - 12 : hourInt;
            const amPm = isPM ? 'PM' : 'AM';
            
            return (
              <CarouselItem key={`hour-nav-${hour}`} className="pl-0.5 basis-auto">
                <Button
                  onClick={() => onHourSelect(hour)}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`${isMobile ? 'h-7 min-w-12 text-xs px-2' : 'h-8 min-w-16 text-sm px-3'} font-medium
                    ${isActive ? 'bg-blue-600' : 'hover:bg-blue-50'}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {displayHour}{amPm}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={`${isMobile ? 'h-5 w-5 -left-1' : 'h-6 w-6 -left-2'}`} />
        <CarouselNext className={`${isMobile ? 'h-5 w-5 -right-1' : 'h-6 w-6 -right-2'}`} />
      </Carousel>
      
      {/* Slider for continuous time selection */}
      <div className="px-2">
        <Slider
          defaultValue={[getCurrentHourIndex()]}
          value={[getCurrentHourIndex()]}
          max={hours.length - 1}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>08:00</span>
          <span>15:00</span>
          <span>21:00</span>
        </div>
      </div>
    </div>
  );
}
