import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { feedItemType, feedItemListType } from 'newsdash/components/propTypes'
import Item from './Item'
import itemTransition from './itemTransition.sss'
import css from './List.sss'

const { transitionSpeed, ...transitionClassNames } = itemTransition

/* eslint no-param-reassign:
   ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
const onEnter = (node) => {
  node.style.marginTop = `-${node.offsetHeight}px`
}
const onEntering = (node) => {
  node.style.marginTop = ''
}

const List = ({ items, type }) => (
  <TransitionGroup className={css.feedList} component="ul">
    {items.map((item) => (
      <CSSTransition
        classNames={{ ...transitionClassNames }}
        key={item.id}
        timeout={parseInt(transitionSpeed.slice(0, -2), 10)}
        onEnter={onEnter}
        onEntering={onEntering}
      >
        <Item type={type} item={item} />
      </CSSTransition>
    ))}
  </TransitionGroup>
)

List.propTypes = {
  type: feedItemListType.isRequired,
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default List
