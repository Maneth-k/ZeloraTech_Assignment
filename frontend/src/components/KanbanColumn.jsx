import { Droppable } from "@hello-pangea/dnd";
import CandidateCard from "./CandidateCard";

export default function KanbanColumn({ id, title, candidates }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{candidates.length}</span>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {candidates.map((candidate, index) => (
              <CandidateCard key={candidate.id} candidate={candidate} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
