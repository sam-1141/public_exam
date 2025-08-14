import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const QuestionReorderModal = ({ questions, onClose, onSave }) => {
    const [localQuestions, setLocalQuestions] = useState([...questions]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(localQuestions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setLocalQuestions(items);
    };

    const handlePositionChange = (questionId, newPosition) => {
        if (newPosition < 1 || newPosition > localQuestions.length) return;

        const items = [...localQuestions];
        const currentIndex = items.findIndex((q) => q.id === questionId);

        // Remove the item from its current position
        const [movedItem] = items.splice(currentIndex, 1);

        // Insert at new position (adjusting for 0-based index)
        items.splice(newPosition - 1, 0, movedItem);

        // Update the state with the new order
        setLocalQuestions(items);
    };

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
                zIndex: 1050,
            }}
        >
            <div
                className="modal-dialog modal-xl"
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 auto",
                    maxWidth: "1140px",
                    padding: "20px",
                }}
            >
                <div
                    className="modal-content"
                    style={{
                        height: "90vh",
                        display: "flex",
                        flexDirection: "column",
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

                    <div
                        className="modal-body p-0"
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            position: "relative",
                        }}
                    >
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="questions">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="list-group list-group-flush"
                                        style={{ minHeight: "100%" }}
                                    >
                                        {localQuestions.map(
                                            (question, index) => (
                                                <Draggable
                                                    key={question.id}
                                                    draggableId={String(
                                                        question.id
                                                    )}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            className="list-group-item"
                                                        >
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="cursor-move text-muted"
                                                                >
                                                                    <i className="fas fa-grip-vertical fs-5"></i>
                                                                </div>

                                                                <div className="flex-grow-1">
                                                                    <div className="fw-medium">
                                                                        Q
                                                                        {index +
                                                                            1}
                                                                        :
                                                                    </div>
                                                                    <div
                                                                        className="text-muted mt-1"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                question
                                                                                    .question
                                                                                    .length >
                                                                                60
                                                                                    ? `${question.question.substring(
                                                                                          0,
                                                                                          60
                                                                                      )}...`
                                                                                    : question.question,
                                                                        }}
                                                                    />
                                                                    {question.question_image && (
                                                                        <div className="mt-2">
                                                                            <img
                                                                                src={`/storage/${question.question_image}`}
                                                                                alt="Question"
                                                                                className="img-thumbnail"
                                                                                style={{
                                                                                    maxWidth:
                                                                                        "120px",
                                                                                    maxHeight:
                                                                                        "80px",
                                                                                    objectFit:
                                                                                        "contain",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="d-flex align-items-center gap-2">
                                                                    <span className="text-muted">
                                                                        Position:
                                                                    </span>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        max={
                                                                            localQuestions.length
                                                                        }
                                                                        value={
                                                                            index +
                                                                            1
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newPos =
                                                                                parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            if (
                                                                                !isNaN(
                                                                                    newPos
                                                                                )
                                                                            ) {
                                                                                handlePositionChange(
                                                                                    question.id,
                                                                                    newPos
                                                                                );
                                                                            }
                                                                        }}
                                                                        className="form-control form-control-sm"
                                                                        style={{
                                                                            width: "70px",
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>

                    <div className="modal-footer border-top">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => onSave(localQuestions)}
                        >
                            Save Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionReorderModal;
