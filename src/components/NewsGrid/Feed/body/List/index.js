import React from 'react'
import PropTypes from 'prop-types'

import css from './List.sass'
import { feedItemType } from '../../../../../propTypes'
import Item from './Item'

const List = ({ items }) => (
  <ul className={css.feedList}>
    {items.map((item) => <Item item={item} key={item.id} />)}
  </ul>
)

List.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default List
