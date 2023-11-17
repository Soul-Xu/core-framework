/**
 * @antv/g2plot 柱状图
 */
import { Column } from "@antv/g2plot";
import React, { useEffect } from "react";
import { data } from "./constants";

const ColumnDemo: React.FC = () => {
  useEffect(() => {
    const column = new Column("column-container", {
      data,
      xField: 'type',
      yField: 'sales',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    })
    column.render();
  }, [])

  return (
    <div id="column-container"></div>
  )
}

export default ColumnDemo