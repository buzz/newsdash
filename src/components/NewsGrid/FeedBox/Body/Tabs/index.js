import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableTabBar from 'rc-tabs/lib/ScrollableTabBar'
import 'rc-tabs/assets/index.css'
import Scrollbar from 'react-custom-scrollbars'

import { feedType } from '../../../../../propTypes'
import Feed from '../Feed'
import css from './Tabs.sass'

const FeedTabs = ({ activeFeedId, feeds, setActiveFeedId }) => (
  <div className={css.tabs}>
    <Tabs
      activeKey={activeFeedId.toString()}
      onChange={(key) => setActiveFeedId(parseInt(key, 10))}
      renderTabBar={() => <ScrollableTabBar className={classNames('nondraggable', css.tabsBar)} />}
      renderTabContent={() => <TabContent />}
    >
      {
        feeds.map((feed) => (
          <TabPane key={feed.id.toString()} tab={feed.customTitle || feed.title}>
            <Scrollbar autoHide>
              <Feed feed={feed} />
            </Scrollbar>
          </TabPane>
        ))
      }
    </Tabs>
  </div>
)

FeedTabs.propTypes = {
  activeFeedId: PropTypes.number.isRequired,
  feeds: PropTypes.arrayOf(feedType).isRequired,
  setActiveFeedId: PropTypes.func.isRequired,
}

export default FeedTabs
