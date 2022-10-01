import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useTheme } from "styled-components";
import { Entrance } from "components/Center";

function getStyles(left, top, isDragging) {
  // const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    left: left,
    top: top,
    // transform,
    // WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    // opacity: isDragging ? 0 : 1,
    // height: isDragging ? 0 : "",
  };
}
export const DraggableItem = memo(function DraggableItem(props) {
  const { id, xloc, yloc, img, type, name } = props;
  const {
    center: { iconSize },
  } = useTheme();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id, xloc, yloc, img, name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, xloc, yloc, img, name]
  );
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);
  if (isDragging) {
    return <div ref={drag} />;
  }
  console.log(img);
  return (
    <div
      ref={drag}
      style={getStyles(xloc, yloc, isDragging)}
      role="DraggableBox"
    >
      {name === "entrance" ? (
        <Entrance>입구</Entrance>
      ) : (
        <img
          src={img}
          height={`${iconSize}px`}
          width={`${iconSize}px`}
          style={{ cursor: "pointer" }}
        ></img>
      )}
    </div>
  );
});
