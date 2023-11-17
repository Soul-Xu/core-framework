/**
 * @antv/g2plot 条形图
 */
import { Bar } from '@antv/g2plot';
import React, { useEffect } from "react";
import { data } from "./constants";

const BarDemo: React.FC = () => {
  useEffect(() => {
    const bar = new Bar('bar-container', {
      data,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
      legend: {
        position: 'top-left',
      },
    });
    
    bar.render();
  }, [])

  return (
    <div id="bar-container"></div>
  )
}

export default BarDemo