import React, { useRef, useState, useEffect } from "react";

export default function StickyNote({
  id,
  onClose,
  onMinimize,
  onUpdateText,
  initialText = "",
}) {
  const noteRef = useRef(null);
  const [text, setText] = useState(initialText);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // --- Drag handlers ---
  const startDrag = (e) => {
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const newLeft = Math.max(0, Math.min(e.clientX - offset.x, window.innerWidth - noteRef.current.offsetWidth));
    const newTop = Math.max(0, Math.min(e.clientY - offset.y, window.innerHeight - noteRef.current.offsetHeight));
    setPosition({ top: newTop, left: newLeft });
  };

  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
    } else {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    }
    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging]);

  // --- Text change handler ---
  const handleChange = (e) => {
    setText(e.target.value);
    if (onUpdateText) onUpdateText(id, e.target.value);
  };

  return (
    <div
      ref={noteRef}
      className="sticky-note"
      style={{ top: position.top, left: position.left }}
    >
      <div className="sticky-header" onMouseDown={startDrag}>
        Sticky Note
        <div>
          <button
            onClick={() => onMinimize(id)}
            type="button"
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <button
            onClick={() => onClose(id)}
            type="button"
            className="btn btn-outline-danger btn-sm"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <textarea
        className="sticky-body"
        value={text}
        onChange={handleChange}
        placeholder="Write here..."
      />
    </div>
  );
}
