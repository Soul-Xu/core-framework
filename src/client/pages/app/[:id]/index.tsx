/** external library */
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import microApp from '@micro-zoe/micro-app'

/** component */
import ProjectContainer from '../../../layout/projectContainer';
import EventManage from './components/eventManage';

const AppById: NextPage = () => {
  const selectTabs = useSelector((state: any) => state.menus.selectTabs);

  const renderTab = () => {
    switch(selectTabs?.fdComponentName) {
      case "Vue2":
        return <micro-app name='vue2-app' url='http://localhost:8080/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>;
      case "Vue3":
        return <micro-app name='vue3-app' url='http://localhost:8081/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>;
      case "React":
        return <micro-app name='react-app' url='http://localhost:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app>;
      case "Documents": 
        return <div style={{ marginTop: "60px" }}>
          <micro-app name='documents' url='http://8.135.113.65:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>
        </div>;
      case "Vite-Vue": 
        return <micro-app name='vite-vue3' url='http://localhost:5173/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app>
      case "Next":
        return <micro-app name='next-app' url='http://localhost:3002/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} ssr></micro-app>;
      case "图形编辑器":  
        return <micro-app name='drawio' url='http://localhost:3030' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app> 
      case "应急中心": 
        return  <div style={{ marginTop: "80px" }}>
           <micro-app name='emergency-center' url='http://localhost:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>;
        </div>
      default:
        return <EventManage />;
    }
  };

  useEffect(() => {
    renderTab()
  }, [selectTabs?.fdComponentName])

  return (
    <>
      <ProjectContainer>
        <div>{renderTab()}</div>
      </ProjectContainer>
    </>
  );
}

export default AppById;
