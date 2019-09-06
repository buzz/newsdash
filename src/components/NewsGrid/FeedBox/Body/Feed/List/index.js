import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import css from './List.sass'
import itemTransition from './itemTransition.sass'
import { feedItemType } from '../../../../../../propTypes'
import Item from './Item'

const { transitionSpeed, ...transitionClassNames } = itemTransition

/* eslint no-param-reassign:
   ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
const onEnter = (node) => {
  node.style.marginTop = `-${node.offsetHeight}px`
}
const onEntering = (node) => {
  node.style.marginTop = ''
}

const List = ({ items }) => (
  <TransitionGroup className={css.feedList} component="ul">
    {
      items.map(
        (item) => (
          <CSSTransition
            classNames={{ ...transitionClassNames }}
            key={item.id}
            timeout={parseInt(transitionSpeed.slice(0, -2), 10)}
            onEnter={onEnter}
            onEntering={onEntering}
          >
            <Item item={item} />
          </CSSTransition>
        )
      )
    }
  </TransitionGroup>
)

List.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default List