import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "./DraggableItem.js";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.js";

export default ({ items, setItems, type }) => {
  return (
    // todo : items overflow 시 박스를 튀어나가고, 스크롤 지정하면 드래그 앤 드롭이 에러 나는 현상 수정해야 함
    <div
      style={{
        minHeight: "200px",
        position: "relative",
        // overflow: "auto",
      }}
    >
      {Object.keys(items).map((key) => (
        <DraggableItem key={key} id={key} type={type} {...items[key]} />
      ))}
    </div>
  );
};
