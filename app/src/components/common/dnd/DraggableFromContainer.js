import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "./DraggableItem.js";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.js";

export default ({ items, setItems, type, handleStatus }) => {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "auto" }}>
      {Object.keys(items).map((key) => (
        <DraggableItem key={key} id={key} type={type} {...items[key]} />
      ))}
    </div>
  );
};
