import { useState, useEffect, SetStateAction} from 'react'
import {ConfigProvider, theme} from 'antd'
import {RouterProvider} from 'react-router-dom'
import {readDb, sendMsgToMain, writeDb} from "electron-prokit"
import GlobalContext from './context/global'
import router from './router'

import './App.css'

function App() {

  const [themeData, setThemeData] = useState('defaultAlgorithm')

  const changeTheme = (val: 'darkAlgorithm' | 'defaultAlgorithm') => {
    setThemeData(val)
    writeDb('theme', val)
    sendMsgToMain({key: 'changeTheme', data: val === 'darkAlgorithm' ? 'dark' : 'light'})
  }

  useEffect(() => {
    readDb('theme').then((res: string) => {
      if (res) {
        setThemeData(res)
        sendMsgToMain({key:'changeTheme',data:res === 'darkAlgorithm' ? 'dark' : 'light'})
      } else {
        setThemeData('defaultAlgorithm')
        sendMsgToMain({key:'changeTheme',data:'light'})
      }
    }).catch(() => {
      setThemeData('defaultAlgorithm')
      sendMsgToMain({key:'changeTheme',data:'light'})
    })
  }, [])

  return (
    <ConfigProvider theme={{ algorithm: themeData === 'darkAlgorithm' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <GlobalContext.Provider value={{
        changeTheme,
        themeData
      }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </ConfigProvider>
  )
}

export default App
