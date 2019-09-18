import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableTabBar from 'rc-tabs/lib/ScrollableTabBar'
import Scrollbar from 'react-custom-scrollbars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faSync } from '@fortawesome/free-solid-svg-icons'
import 'rc-tabs/assets/index.css'

import { feedBoxType, feedType } from 'newsdash/components/propTypes'
import { FEED_STATUS } from 'newsdash/constants'
import Feed from 'newsdash/components/Feed'
import css from './Tabs.sass'

const FeedTabs = ({
  activeFeedId,
  feedBox,
  feeds,
  setActiveFeedId,
}) => {
  const scrollableTabBarStyle = {
    backgroundColor: feedBox.colors.tabsBg,
    borderColor: feedBox.colors.border,
  }
  return (
    <div className={css.tabs}>
      <Tabs
        activeKey={activeFeedId.toString()}
        onChange={(key) => setActiveFeedId(parseInt(key, 10))}
        renderTabBar={() => <ScrollableTabBar className={classNames('nondraggable', css.tabBar)} style={scrollableTabBarStyle} />}
        renderTabContent={() => <TabContent />}
      >
        {
          feeds.map((feed) => {
            let tabIcon = null
            if (feed.status === FEED_STATUS.LOADING) {
              tabIcon = (
                <FontAwesomeIcon
                  className={css.tabIcon}
                  fixedWidth
                  icon={faSync}
                  spin
                  title={`Failed to update feed: ${feed.error}`}
                />
              )
            } else if (feed.status === FEED_STATUS.ERROR) {
              tabIcon = (
                <FontAwesomeIcon
                  className={classNames(css.tabIcon, css.error)}
                  fixedWidth
                  icon={faExclamationTriangle}
                  title={`Failed to update feed: ${feed.error}`}
                />
              )
            }
            const tabContent = (
              <>
                {feed.customTitle || feed.title}
                {tabIcon}
              </>
            )
            return (
              <TabPane key={feed.id.toString()} tab={tabContent}>
                <Scrollbar autoHide>
                  <Feed feed={feed} />
                </Scrollbar>
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  )
}

FeedTabs.propTypes = {
  activeFeedId: PropTypes.number.isRequired,
  feedBox: feedBoxType.isRequired,
  feeds: PropTypes.arrayOf(feedType).isRequired,
  setActiveFeedId: PropTypes.func.isRequired,
}

export default FeedTabs
