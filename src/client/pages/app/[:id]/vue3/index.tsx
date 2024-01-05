/** external library */
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MainContent from './content';
import microApp from '@micro-zoe/micro-app'

/** component */
import ProjectContainer from '../../../../layout/projectContainer';

const Vue3Component: NextPage = () => {
  const [show, changeShow] = useState(false)

  useEffect(() => {
    changeShow(true)
  }, [])

  return (
    <>
      <ProjectContainer>
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <h1>vue3-app子应用</h1>
          {
            // name：应用名称, url：应用地址
            show && (<micro-app name='vue3-app' url='http://localhost:8080/'></micro-app>)
          }
        </div>
      </ProjectContainer>
    </>
  );
}

export default Vue3Component;

