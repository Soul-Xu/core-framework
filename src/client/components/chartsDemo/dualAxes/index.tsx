import { DualAxes } from "@antv/g2plot";
import React, { useEffect } from "react";
import { data } from "./constants";

const DualAxesDemo: React.FC = () => {
  useEffect(() => {
    const dualAxes = new DualAxes("dualAxes-container", {
      data: [data, data],
      xField: 'year',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'line',
          color: '#5B8FF9',
        },
        {
          geometry: 'line',
          color: '#5AD8A6',
        },
      ],
    })
    dualAxes.render();
  }, [])

  return (
    <div id="dualAxes-container"></div>
  )
}

export default DualAxesDemo