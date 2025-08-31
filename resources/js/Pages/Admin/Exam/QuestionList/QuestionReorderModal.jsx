import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

const QuestionReorderModal = ({ questions, onClose, onSave }) => {
    const [localQuestions, setLocalQuestions] = useState([...questions]);
    // Track which item is currently being dragged
    const [activeId, setActiveId] = useState(null);

    // Configure sensors for drag interactions
    // PointerSensor: handles mouse/touch drag events
    // KeyboardSensor: enables keyboard accessibility for screen readers
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event) => {
        // Store the ID of the item being dragged
        setActiveId(event.active.id);
    };

    // Called when drag operation ends (item is dropped)
    const handleDragEnd = (event) => {
        const { active, over } = event;
        // Reset the active drag state
        setActiveId(null);

        // Only proceed if dropped on a different item
        if (active.id !== over?.id) {
            setLocalQuestions((items) => {
                // Find the current positions of dragged and target items
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                );
                const newIndex = items.findIndex((item) => item.id === over.id);

                // Create new array with moved item
                const newItems = [...items];
                // Remove the dragged item from its current position
                const [movedItem] = newItems.splice(oldIndex, 1);
                // Insert the dragged item at its new position
                newItems.splice(newIndex, 0, movedItem);

                return newItems;
            });
        }
    };

    return (
        <div
            className="modal fade show d-block bg-dark bg-opacity-50 position-fixed top-0 start-0 w-100 h-100 overflow-hidden"
            style={{
                zIndex: 1050,
            }}
        >
            <div className="modal-dialog modal-xl h-100 d-flex align-items-center mx-auto p-3">
                <div
                    className="modal-content d-flex flex-column"
                    style={{
                        height: "90vh",
                    }}
                >
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title font-semibold text-xl mb-0">
                            Reorder Questions
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body p-0 flex-fill overflow-auto">
                        <div className="p-3 border-bottom">
                            <div className="alert alert-info py-2 mb-0">
                                <i className="fas fa-arrows-alt me-2"></i>
                                Drag questions up or down to reorder them
                            </div>
                        </div>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            {localQuestions.map((question, index) => (
                                <div
                                    key={question.id}
                                    id={question.id}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData(
                                            "text/plain",
                                            question.id
                                        );
                                        setActiveId(question.id);
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    // Get the ID of the dragged item
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const draggedId =
                                            e.dataTransfer.getData(
                                                "text/plain"
                                            );
                                        // Only proceed if dropping on a different item
                                        if (
                                            draggedId &&
                                            draggedId !== question.id
                                        ) {
                                            // Find indices of dragged and target items
                                            const draggedIndex =
                                                localQuestions.findIndex(
                                                    (q) => q.id == draggedId
                                                );
                                            const targetIndex = index;

                                            if (draggedIndex !== -1) {
                                                // Reorder the questions array
                                                const newQuestions = [
                                                    ...localQuestions,
                                                ];
                                                const [movedQuestion] =
                                                    newQuestions.splice(
                                                        draggedIndex,
                                                        1
                                                    );
                                                newQuestions.splice(
                                                    targetIndex,
                                                    0,
                                                    movedQuestion
                                                );
                                                setLocalQuestions(newQuestions);
                                            }
                                        }
                                        setActiveId(null);
                                    }}
                                    // make dragged item semi-transparent
                                    style={{
                                        opacity:
                                            activeId === question.id ? 0.5 : 1,
                                        cursor: "move",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3 p-3 border-bottom">
                                        {/* Drag handle icon */}
                                        <div className="cursor-move">
                                            <i className="fas fa-grip-vertical text-muted"></i>
                                        </div>

                                        <div className="text-muted px-2">
                                            Q{index + 1}
                                        </div>

                                        <div className="flex-grow-1">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        question.question
                                                            .length > 80
                                                            ? `${question.question.substring(
                                                                  0,
                                                                  80
                                                              )}...`
                                                            : question.question,
                                                }}
                                            />
                                            {/* Display question image if available (reduced size) */}
                                            {question.question_image && (
                                                <div className="mt-2">
                                                    <img
                                                        src={`/storage/${question.question_image}`}
                                                        alt="Question"
                                                        className="rounded border"
                                                        style={{
                                                            maxWidth: "120px",
                                                            maxHeight: "80px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </DndContext>
                    </div>

                    <div className="modal-footer border-top">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => onSave(localQuestions)}
                        >
                            Save All Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionReorderModal;
