import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
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
  const { id, left, top, component, type, name } = props;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id, left, top, component, name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, component, name]
  );
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      {component}
    </div>
  );
});
