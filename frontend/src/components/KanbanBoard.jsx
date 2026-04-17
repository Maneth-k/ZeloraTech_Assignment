import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({ columns, candidates, onDragEnd }) {
  return (
    <div className="kanban-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {columns.map((column) => {
            const columnCandidates = candidates.filter((c) => c.stage === column.id);
            return (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                candidates={columnCandidates}
                color={column.color}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
