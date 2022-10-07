import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "./DraggableItem.js";
import { useTheme } from "styled-components";

const handleStatus = (item, fromItems) => {
  let status = "";
  if (fromItems.some(({ name }) => name === item.name)) {
    status = "UpToDown";
  } else {
    status = "DownToDown";
  }
  return status;
};

export default ({ fromItems, items, setItems, setFromItems, type }) => {
  const {
    center: { upListHeight, gap },
  } = useTheme();
  const heightGap = upListHeight + gap;

  const moveBox = useCallback(
    (id, xloc, yloc, status) => {
      status === "UpToDown"
        ? setItems([
            ...items,
            {
              ...fromItems[id],
              img: fromItems[id].img,
              name: fromItems[id].name,
              yloc: yloc,
              xloc: xloc,
            },
          ])
        : setItems(
            update(items, {
              [id]: {
                $merge: { xloc, yloc },
              },
            })
          );
    },
    [items, fromItems]
  );

  const [, drop] = useDrop(
    () => ({
      accept: type,
      drop(item, monitor) {
        // console.log(monitor.getInitialClientOffset()); //드래그 시작될 시점의 포인터 위치
        // console.log(monitor.getInitialSourceClientOffset()); //드래그 시작될 시점의 컴포넌트 위치
        // console.log(monitor.getClientOffset()); //마지막으로 드래그될 시점의 위치
        // console.log(monitor.getDifferenceFromInitialOffset()); //포인터의 마지막 위치와 드래그 시작된 위치의 차
        // console.log(monitor.getSourceClientOffset()); //예상되는 위치
        const status = handleStatus(item, [...fromItems]);
        setFromItems(fromItems.filter(({ name }) => name !== item.name));
        const delta = monitor.getDifferenceFromInitialOffset();
        let xloc = Math.round(item.xloc + delta.x);
        let yloc =
          status === "UpToDown"
            ? Math.round(item.yloc + delta.y - heightGap)
            : Math.round(item.yloc + delta.y);
        moveBox(item.id, xloc, yloc, status);
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
