import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { people as initialPeople, roles } from "./data";
import "./style.css";

export type ColumnKey = "ready" | "done" | "parking_lot" | "out_of_office";
export type RoleKey = keyof typeof roles;

export interface Person {
  id: string | number;
  name: string;
  role: RoleKey;
}

type Columns = Record<ColumnKey, Person[]>;

const initialColumns: Columns = {
  ready: initialPeople,
  done: [],
  parking_lot: [],
  out_of_office: [],
};

function App() {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceId = source.droppableId as ColumnKey;
    const destId = destination.droppableId as ColumnKey;

    if (sourceId === destId && source.index === destination.index) return;

    setColumns((prev) => {
      const sourceList = Array.from(prev[sourceId]);
      const [moved] = sourceList.splice(source.index, 1);

      if (sourceId === destId) {
        sourceList.splice(destination.index, 0, moved);
        return { ...prev, [sourceId]: sourceList };
      }

      const destList = Array.from(prev[destId]);
      destList.splice(destination.index, 0, moved);

      return { ...prev, [sourceId]: sourceList, [destId]: destList };
    });
  };

  // Click-to-Done
  const handleClick = (person: Person) => {
    setColumns((prev) => {
      const clone: Columns = {
        ready: [...prev.ready],
        done: [...prev.done],
        parking_lot: [...prev.parking_lot],
        out_of_office: [...prev.out_of_office],
      };

      (Object.keys(clone) as ColumnKey[]).some((key) => {
        const idx = clone[key].findIndex((p) => String(p.id) === String(person.id));
        if (idx !== -1) {
          const [moved] = clone[key].splice(idx, 1);
          clone.done.push(moved);
          return true;
        }
        return false;
      });

      return clone;
    });
  };

  const columnsMeta: { id: ColumnKey; title: string }[] = [
    { id: "ready", title: "Ready" },
    { id: "done", title: "Done" },
    { id: "parking_lot", title: "Parking Lot" },
    { id: "out_of_office", title: "Out of Office" },
  ];

  return (
    <main className="app">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columnsMeta.map(({ id, title }) => (
            <Column
              key={id}
              id={id}
              title={title}
              people={columns[id]}
              onClick={handleClick}
            />
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}

export default App;
