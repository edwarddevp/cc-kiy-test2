import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core'
import PropTypes from "prop-types";

/*fitted ajusta el ancho de las tabs al ancho del contenido */
export const DataTabs = ({ fitted, data, styles, variant, contentMinH, tabIndex, setTabIndex, externalNav }) => {
  const isDisabled = (tab, index) => {
    return externalNav ? tabIndex !== index : false
  }

  return (
    <Tabs isFitted={fitted} index={tabIndex} variant={variant || 'line'} {...styles} onChange={index => setTabIndex(index)}>
      <TabList>
        {data.map((tab, index) => (
          <Tab isDisabled={isDisabled(tabIndex, index)} className={'no-focus'} key={index}>{tab.label || `tab ${index + 1}`}</Tab>
        ))}
      </TabList>
      <TabPanels minH={contentMinH}>
        {data.map((tab, index) =>
          <TabPanel p={4} key={index}>
            {tabIndex === index && tab.content}
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}


DataTabs.propTypes = {
  data: PropTypes.array,
  styles: PropTypes.object,
  variant: PropTypes.string,
  contentMinH: PropTypes.string,
  defaultIndex: PropTypes.number
}
