/** external library */
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

/** component */
import ProjectContainer from '../../../layout/projectContainer';
import TabsContent1 from './components/tab1';

const AppById: NextPage = () => {
  const selectTabs = useSelector((state: any) => state.menus.selectTabs);

  const renderTab = (tab: string) => {
    switch(tab) {
      case "vue2":
        return <div data-single-spa-root id="vue2-app" />;
      case "vue3":
        return <div data-single-spa-root id="vue3-app" />;
      case "react":
        return <div data-single-spa-root id="react-app" />;
      default:
        return <TabsContent1 />;
    }
  };

  return (
    <>
      <ProjectContainer>
        <div>{renderTab(selectTabs?.fdComponentName)}</div>
      </ProjectContainer>
    </>
  );
}

export default AppById;
