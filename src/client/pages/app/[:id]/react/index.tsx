/** external library */
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import microApp from '@micro-zoe/micro-app'

/** component */
import ProjectContainer from '../../../../layout/projectContainer';
import MainContent from './content';

const ReactComponent: NextPage = () => {
  const [show, changeShow] = useState(false)

  useEffect(() => {
    changeShow(true)
  }, [])

  return (
    <>
      <ProjectContainer>
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <h1>react-app子应用</h1>
          {
            // name：应用名称, url：应用地址
            show && (<micro-app name='react-app' url='http://localhost:3001/'></micro-app>)
          }
        </div>
      </ProjectContainer>
    </>
  );
}

export default ReactComponent;
