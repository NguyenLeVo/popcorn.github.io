import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { roles } from "./data";

export interface Person {
  id: string | number;
  name: string;
  role: keyof typeof roles;
}

type Props = {
  person: Person;
  index: number;
  onClick?: (p: Person) => void;
};

const PersonCard: React.FC<Props> = ({ person, index, onClick }) => {
  const roleInfo = roles[person.role] ?? { label: String(person.role), color: "#999" };

  return (
    <Draggable draggableId={String(person.id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick?.(person)}
          style={{
            borderLeft: `6px solid ${roleInfo.color}`,
            ...provided.draggableProps.style,
          }}
        >
          <div className="card-content">
            <div>
              <div className="name">{person.name}</div>
              <div className="role">{roleInfo.label}</div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PersonCard;
