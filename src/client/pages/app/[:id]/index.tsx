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
    switch(selectTabs?.key) {
      case "Vue2":
        return <micro-app name='vue2-app' url='http://localhost:8080/'></micro-app>;
      case "Vue3":
        return <micro-app name='vue3-app' url='http://localhost:8081/'></micro-app>;
      case "React":
        return <micro-app name='react-app' url='http://localhost:3001/'></micro-app>;
      default:
        return <EventManage />;
    }
  };

  return (
    <>
      <ProjectContainer>
        <div>{renderTab()}</div>
      </ProjectContainer>
    </>
  );
}

export default AppById;
