
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, MessageSquare, Trash } from "lucide-react";
import { formatDate } from '@/lib/utils';
import { Player } from '@/types/player/interfaces';
import ProgramBadge from './components/ProgramBadge';

interface PlayerRowProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (playerId: string) => void;
  onMessage: (player: Player) => void;
}

const PlayerRow = ({ player, onEdit, onDelete, onMessage }: PlayerRowProps) => {
  // Format level as a nicely styled badge
  const getLevelBadge = (level: string) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-700';
    
    switch (level.toLowerCase()) {
      case 'beginner':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'intermediate':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'advanced':
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-800';
        break;
      case 'professional':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
    }
    
    return (
      <span className={`${bgColor} ${textColor} text-xs px-2 py-1 rounded-full`}>
        {level}
      </span>
    );
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="p-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 mr-3 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            {player.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{player.name}</div>
            <div className="text-gray-500 text-sm">{player.email || 'No email'}</div>
          </div>
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm">
        {player.level ? getLevelBadge(player.level) : 'N/A'}
      </td>
      <td className="p-4 whitespace-nowrap text-sm">
        <div className="flex flex-wrap gap-1">
          {player.programs && player.programs.map(program => (
            <ProgramBadge key={program} programId={program} />
          ))}
          {!player.programs && player.program && (
            <ProgramBadge programId={player.program} />
          )}
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm">
        {player.phone || 'N/A'}
      </td>
      <td className="p-4 whitespace-nowrap text-sm">
        {player.joinDate ? formatDate(player.joinDate) : 'N/A'}
      </td>
      <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(player)}
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMessage(player)}
          >
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => onDelete(player.id)}
          >
            <Trash className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PlayerRow;
