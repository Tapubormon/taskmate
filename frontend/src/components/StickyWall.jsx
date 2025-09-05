import React, { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

export default function StickyWall() {
  const [stickies, setStickies] = useState([]);
  const [dockItems, setDockItems] = useState([]);
  const [counter, setCounter] = useState(0);

  // Listen for sidebar click event
  useEffect(() => {
    const handleCreateSticky = () => {
      const newId = `sticky-${counter + 1}`;
      setStickies((prev) => [...prev, { id: newId, text: "" }]);
      setCounter((prev) => prev + 1);
    };
    window.addEventListener("createSticky", handleCreateSticky);
    return () => window.removeEventListener("createSticky", handleCreateSticky);
  }, [counter]);

  const closeSticky = (id) => {
    setStickies(stickies.filter((s) => s.id !== id));
    setDockItems(dockItems.filter((d) => d.id !== id));
  };

  const minimizeSticky = (id) => {
    if (dockItems.length >= 6) {
      alert("You can only minimize up to 6 notes at a time.");
      return;
    }
    const note = stickies.find((s) => s.id === id);
    if (!note) return;
    setDockItems([...dockItems, note]);
  };

  const restoreSticky = (id) => {
    setDockItems(dockItems.filter((d) => d.id !== id));
  };

  const updateStickyText = (id, text) => {
    setStickies(stickies.map((s) => (s.id === id ? { ...s, text } : s)));
  };

  return (
    <>
      <div id="stickyContainer">
        {stickies.map((sticky) =>
          dockItems.find((d) => d.id === sticky.id) ? null : (
            <StickyNote
              key={sticky.id}
              id={sticky.id}
              initialText={sticky.text}
              onClose={closeSticky}
              onMinimize={minimizeSticky}
              onUpdateText={updateStickyText}
            />
          )
        )}
      </div>

      <div id="stickyDock" className="sticky-dock">
        {dockItems.map((item) => (
          <div
            key={item.id}
            className="sticky-dock-item"
            title={item.text.slice(0, 20) || "Sticky Note"}
            onClick={() => restoreSticky(item.id)}
            onMouseEnter={() =>
              setStickies(
                stickies.map((s) =>
                  s.id === item.id ? { ...s, minimizedPreview: true } : s
                )
              )
            }
            onMouseLeave={() =>
              setStickies(
                stickies.map((s) =>
                  s.id === item.id ? { ...s, minimizedPreview: false } : s
                )
              )
            }
          >
            📝
          </div>
        ))}
      </div>
    </>
  );
}
