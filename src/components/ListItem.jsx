import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item, isFocused }) => {
  return (
    <div
      className={`list-item ${isFocused ? 'focused' : ''}`}
      style={{
        width: 150,
        height: 250,
        marginRight: 10,
        overflow: 'hidden',
        border: isFocused ? '2px solid blue' : '2px solid transparent',
        transition: 'border 0.3s',
      }}
    >
      <img
        src={item.images.artwork_portrait}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <p>{item.title}</p>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.shape({
      artwork_portrait: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default ListItem;
