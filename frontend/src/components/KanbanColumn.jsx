import { Droppable } from "@hello-pangea/dnd";
import CandidateCard from "./CandidateCard";

export default function KanbanColumn({ id, title, candidates, color }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2 className="column-title-badge" style={{ color: color, backgroundColor: `${color}1A`, padding: '6px 14px', borderRadius: '99px' }}>
          {title}
        </h2>
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
