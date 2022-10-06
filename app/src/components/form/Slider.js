import MuiSlider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

const minDistance = 0;

const Slider = ({ formLine, setValue, ...rest }) => {
  const { name, minName, maxName } = formLine;
  const theme = useTheme();
  const [range, setRange] = useState([0, 50]);

  const marks = [
    { value: range[0], label: `${range[0]}만원` },
    {
      value: range[1],
      label: range[1] === 50 ? `${range[1]}만원 이상` : `${range[1]}만원`,
    },
  ];

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  useEffect(() => {
    setValue(minName, range[0] * 10000);
    setValue(maxName, range[1] * 10000);
  }, [range]);

  return (
    <div>
      <MuiSlider
        marks={marks}
        step={1}
        value={range}
        valueLabelDisplay="off"
        valueLabelFormat={(x) => `${x}만원`}
        onChange={handleChange}
        onDragEnd={() => console.log("df")}
        min={0}
        max={50}
        disableSwap
        style={{ color: theme.color.main }}
      />
    </div>
  );
};

export default Slider;
