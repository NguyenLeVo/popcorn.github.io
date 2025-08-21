import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import PersonCard, { Person } from "./PersonCard";

type Props = {
  id: string;              // must equal the state key, e.g., "ready"
  title: string;
  people: Person[];
  onClick?: (p: Person) => void;
};

const Column: React.FC<Props> = ({ id, title, people, onClick }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {people.map((person, index) => (
              <PersonCard
                key={String(person.id)}
                person={person}
                index={index}
                onClick={onClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
