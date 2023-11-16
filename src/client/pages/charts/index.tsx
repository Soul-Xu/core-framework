import React, { useEffect } from "react"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import PageLayout from "../../layout/PageLayout"
import { Row, Col, Card, Divider } from "antd"
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

/** components */
// import LineDemo from "../../components/chartsDemo/line"
// import AreaDemo from "../../components/chartsDemo/area"
// import ColumnDemo from "../../components/chartsDemo/column"
// import BarDemo from "../../components/chartsDemo/bar"
// import PieDemo from "../../components/chartsDemo/pie"
// import DualAxesDemo from "../../components/chartsDemo/dualAxes"

// import CustomLineDemo from '../../components/chartsDemo/customLine/index';
// import CustomPieDemo from '../../components/chartsDemo/customPie/index';
// import CustomMixDemo from '../../components/chartsDemo/customMix/index';

const LineDemo = dynamic(() => import("../../components/chartsDemo/line"))
const AreaDemo = dynamic(() => import("../../components/chartsDemo/area"))
const ColumnDemo = dynamic(() => import("../../components/chartsDemo/column"))
const BarDemo = dynamic(() => import("../../components/chartsDemo/bar"))
const PieDemo = dynamic(() => import("../../components/chartsDemo/pie"))
const DualAxesDemo = dynamic(() => import("../../components/chartsDemo/dualAxes"))

const CustomLineDemo = dynamic(() => import("../../components/chartsDemo/customLine/index"))
const CustomPieDemo = dynamic(() => import("../../components/chartsDemo/customPie/index"))
const CustomMixDemo = dynamic(() => import("../../components/chartsDemo/customMix/index"))

interface ChartsProps {
}

const Charts: NextPage = () => {
  useEffect(() => {
    try {
      console.log("charts-111111111")
    } catch(err: any) {
      console.error("charts", err)
    }
  }, [])

  return(
    // @ts-ignore
    <PageLayout>
      <section className={classNames("container")}>
        <h1 className={classNames("container-title")}>图表示例</h1>
        <div className={classNames("container-content")}>
          <h3>基础图表</h3>
          {/* @ts-ignore */}
          <Divider />
          <section className={classNames("content-demos")}>
            {/* @ts-ignore */}
            <Row className={classNames("row-demo")}>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="折线图">
                  {/* @ts-ignore */}
                  <LineDemo />
                </Card>
              </Col>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="面积图">
                  {/* @ts-ignore */}
                  <AreaDemo />
                </Card>
              </Col>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="柱状图">
                  {/* @ts-ignore */}
                  <ColumnDemo />
                </Card>
              </Col>
            </Row>
            <Row className={classNames("row-demo")}>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="条形图">
                  {/* @ts-ignore */}
                  <BarDemo />
                </Card>
              </Col>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="饼图">
                  {/* @ts-ignore */}
                  <PieDemo />
                </Card>
              </Col>
              <Col span={8} className={classNames("col-demo")}>
                <Card title="双折线图">
                  {/* @ts-ignore */}
                  <DualAxesDemo />
                </Card>
              </Col>
            </Row>
          </section>
        </div>
        <Divider />
        <div className={classNames("container-content")}>
          <h3>高级图表</h3>
          <Divider />
          <section className={classNames("content-demos")}>
            <Row className={classNames("row-demo")}>
              <Col span={12} className={classNames("col-demo")}>
                <Card title="自定义图形">
                  {/* @ts-ignore */}
                  <CustomLineDemo />
                </Card>
              </Col>
              <Col span={12} className={classNames("col-demo")}>
                <Card title="自定义环形">
                  {/* @ts-ignore */}
                  <CustomPieDemo />
                </Card>
              </Col>
            </Row>
            <Row className={classNames("row-demo")}>
              <Col span={24}>
                <Card title="图表联动">
                  {/* @ts-ignore */}
                  <CustomMixDemo />
                </Card>
              </Col>
            </Row>
          </section>
        </div>
      </section>
    </PageLayout>
  )
}

export default Charts