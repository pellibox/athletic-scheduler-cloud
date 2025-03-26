
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CourtVisionProvider } from "@/components/court-vision/CourtVisionContext";
import { ViewModeToggle } from "@/components/court-vision/ViewModeToggle";
import CourtVisionHeader from "@/components/court-vision/CourtVisionHeader";
import CourtTypeLegend from "@/components/court-vision/CourtTypeLegend";
import CourtGrid from "@/components/court-vision/CourtGrid";
import { AssignmentsDashboard } from "@/components/court-vision/AssignmentsDashboard";
import { useCourtVision } from "@/components/court-vision/CourtVisionContext";

// Main content component that renders based on view type
function CourtVisionContent() {
  const { 
    filteredCourts, 
    timeSlots, 
    selectedDate,
    isLayoutView,
    handleDrop,
    handleActivityDrop,
    handleRemovePerson,
    handleRemoveActivity,
    handleRenameCourt,
    handleChangeCourtType,
    handleChangeCourtNumber
  } = useCourtVision();

  return (
    <div className="flex-1 pb-20">
      {isLayoutView ? (
        <AssignmentsDashboard
          courts={filteredCourts}
          selectedDate={selectedDate}
        />
      ) : (
        <CourtGrid
          courts={filteredCourts}
          timeSlots={timeSlots}
          onDrop={handleDrop}
          onActivityDrop={handleActivityDrop}
          onRemovePerson={handleRemovePerson}
          onRemoveActivity={handleRemoveActivity}
          onRenameCourt={handleRenameCourt}
          onChangeCourtType={handleChangeCourtType}
          onChangeCourtNumber={handleChangeCourtNumber}
        />
      )}
    </div>
  );
}

// Court Vision Header wrapper that connects to context
function HeaderWithContext() {
  const { 
    selectedDate,
    setSelectedDate,
    filteredCourts,
    people,
    activities,
    templates,
    filteredPlayers,
    filteredCoaches,
    timeSlots,
    applyTemplate,
    saveAsTemplate,
    copyToNextDay,
    copyToWeek,
    checkUnassignedPeople,
    handleDrop,
    handleActivityDrop,
    handleAddPerson,
    handleAddActivity,
    handleAddToDragArea
  } = useCourtVision();
  
  return (
    <CourtVisionHeader
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      courts={filteredCourts}
      people={people}
      activities={activities}
      templates={templates}
      playersList={filteredPlayers}
      coachesList={filteredCoaches}
      timeSlots={timeSlots}
      onApplyTemplate={applyTemplate}
      onSaveTemplate={saveAsTemplate}
      onCopyToNextDay={copyToNextDay}
      onCopyToWeek={copyToWeek}
      onCheckUnassigned={checkUnassignedPeople}
      onDrop={handleDrop}
      onActivityDrop={handleActivityDrop}
      onAddPerson={handleAddPerson}
      onAddActivity={handleAddActivity}
      onAddToDragArea={handleAddToDragArea}
    />
  );
}

// Main Court Vision component
export default function CourtVision() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CourtVisionProvider>
        <div className="mx-auto py-4 relative flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Visione Campo</h1>
            <ViewModeToggle />
          </div>
          
          <div className="sticky top-0 z-30 bg-white pb-4">
            <HeaderWithContext />
            <CourtTypeLegend />
          </div>
          
          <CourtVisionContent />
        </div>
      </CourtVisionProvider>
    </DndProvider>
  );
}
