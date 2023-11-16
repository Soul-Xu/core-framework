import { Bar } from '@antv/g2plot';
import { data } from "./constants"
import { useEffect } from 'react';

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