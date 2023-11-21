/**
 * 应用:id
 */
/** external library */
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
/** component */
import AppIdContainer from './components/container';
import TabsContent1 from './components/tab1';
import TabsContent2 from './components/tab2';
import TabsContent3 from './components/tab3';
import TabsContent4 from './components/tab4';
import TabsContent5 from './components/tab5';

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
      case "4":
        return <TabsContent4 />
      case "5":
        return <TabsContent5 />
      default:
        return
    }
  }

  useEffect(() => {
    console.log("redux-tab", tab, typeof tab === "string")
    renderTab(tab)
  }, [tab])

  return (
    <>
      <AppIdContainer>
        <div>{renderTab(tab)}</div>
      </AppIdContainer>
    </>
  )
}

export default AppById
