import { Pie } from "@antv/g2plot"
import { useEffect } from "react";
import { data } from "./constants"

const PieDemo: React.FC = () => {
  useEffect(() => {
    const pie = new Pie('pie-container', {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
    });
    
    pie.render();
  }, [])

  return (
    <div id="pie-container"></div>
  )
}

export default PieDemo