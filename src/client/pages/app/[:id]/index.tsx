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

/** utils */
import _ from "lodash"

const AppById = () => {
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)

  const renderTab = (tab: string) => {
    switch(tab) {
      case "1":
        return <TabsContent1 />
      default:
        return <TabsContent1 />
    }
  }

  useEffect(() => {
    if(!_.isEmpty(selectTabs)) {
      renderTab(selectTabs?.fdComponentName)
    }
  }, [selectTabs])

  return (
    <>
      <ProjectContainer>
        <div>{renderTab(selectTabs?.fdComponentName)}</div>
      </ProjectContainer>
    </>
  )
}

export default AppById
