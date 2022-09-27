import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "./DraggableItem.js";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.js";

// const styles = {
//   width: 300,
//   height: 300,
//   border: "1px solid black",
//   position: "relative",
// };
export default ({ fromItems, items, setItems, type }) => {
  const moveBox = useCallback(
    (id, left, top) => {
      setItems([
        ...items,
        {
          component: fromItems[id].component,
          top: top,
          left: left,
        },
      ]);
      // setItems(
      //   update(items, {
      //     [id]: {
      //       $merge: { left, top },
      //     },
      //   })
      // );
    },
    [items]
  );
  const [, drop] = useDrop(
    () => ({
      accept: type,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        [left, top] = doSnapToGrid(left, top);
        moveBox(item.id, left, top);
        return undefined;
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [moveBox]
  );
  return (
    <div
      ref={drop}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {Object.keys(items).map((key) => {
        return <DraggableItem key={key} id={key} type={type} {...items[key]} />;
      })}
    </div>
  );
};
