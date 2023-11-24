/**
 * 应用:id
 */
/** external library */
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
/** component */
import ProjectContainer from '../../../layout/projectContainer';
import TabsContent1 from './components/tab1';
import TabsContent2 from './components/tab2';
import TabsContent3 from './components/tab3';

const AppById = () => {
  const dispatchRedux = useDispatch();
  const tab = useSelector((state: any) => state.menu.tab)

  const renderTab = (tab: string) => {
    switch(tab) {
      case "1":
        return <TabsContent1 />
      case "2":
        return <TabsContent2 />
      case "3":
        return <TabsContent3 />
      default:
        return <TabsContent1 />
    }
  }

  return (
    <>
      <ProjectContainer>
        <div>{renderTab(tab)}</div>
      </ProjectContainer>
    </>
  )
}

export default AppById
