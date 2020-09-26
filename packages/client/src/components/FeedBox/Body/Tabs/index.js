import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tabs, { TabPane } from 'rc-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationTriangle,
  faSync,
} from '@fortawesome/free-solid-svg-icons'
import 'rc-tabs/assets/index.css'

import { feedBoxType, feedType } from 'newsdash/components/propTypes'
import { FEED_STATUS } from 'newsdash/constants'
import Scrollbar from 'newsdash/components/Scrollbar'
import Feed from 'newsdash/components/Feed'
import css from './Tabs.sss'

const renderTabBar = (props, TabBar, style) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={classNames('nondraggable', css.tabBar)}
    style={style}
  />
)

const FeedTabs = ({ activeFeedId, feedBox, feeds, setActiveFeedId }) => {
  const scrollableTabBarStyle = {
    backgroundColor: feedBox.colors.tabsBg,
    borderColor: feedBox.colors.border,
  }
  return (
    <div className={css.tabs}>
      <Tabs
        activeKey={activeFeedId.toString()}
        animated
        onChange={(key) => setActiveFeedId(parseInt(key, 10))}
        renderTabBar={(props, TabBar) =>
          renderTabBar(props, TabBar, scrollableTabBarStyle)
        }
      >
        {feeds.map((feed) => {
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
              <Scrollbar bgColor={feedBox.colors.bg}>
                <Feed feed={feed} />
              </Scrollbar>
            </TabPane>
          )
        })}
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
