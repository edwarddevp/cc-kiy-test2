import React, {useState, useEffect} from 'react'

export const useDrawerActions = (isResizable) => {

  let prevX = -1;
  const [showDrawer, setShowDrawer] = useState(true)
  const [showData, setShowData] = useState(true)
  const [showToggle, setShowToggle] = useState(false)
  const [widthDrawer, setWidthDrawer] = useState(250)

  useEffect(() => {
    if (!isResizable) {
      // setWidthDrawer(250)
      Cookies.remove('widthDrawer')
    }
  },[isResizable])

  useEffect(() => {
    if (showDrawer) {
      if (Cookies.get('widthDrawer')) {
        setWidthDrawer(Cookies.get('widthDrawer'))
      } else {
        setWidthDrawer(250)
      }
      setTimeout(() => {
        setShowData(true)
      }, 300)
    } else {
      setWidthDrawer(20)
      setShowData(false)
    }
  }, [showDrawer]);

  const resize = (e) => {
    if (prevX === -1) {
      prevX = e.pageX;
      return false;
    }
    if (prevX > e.pageX) {
      if (prevX > 250) {
        setWidthDrawer(prevX)
        Cookies.set('widthDrawer', prevX)
      } else {
        setWidthDrawer(250)
        Cookies.set('widthDrawer', 250)
      }
    } else if (prevX < e.pageX) {
      setWidthDrawer(prevX)
      Cookies.set('widthDrawer', prevX)
    }

    prevX = e.pageX;
  }

  return [
    showDrawer,
    setShowDrawer,
    showData,
    showToggle,
    setShowToggle,
    widthDrawer,
    resize
  ]

}