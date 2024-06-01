import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchListItems,
  focusNextItem,
  focusPrevItem,
} from '../redux/slice.js';
import ListItem from './ListItem.jsx';
import anime from 'animejs';

const HorizontalList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.list.items);
  const focusedIndex = useSelector((state) => state.list.focusedIndex);
  const status = useSelector((state) => state.list.status);
  const listContainerRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchListItems());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        dispatch(focusNextItem());
      } else if (e.key === 'ArrowLeft') {
        dispatch(focusPrevItem());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (listContainerRef.current) {
      anime({
        targets: listContainerRef.current,
        translateX: -focusedIndex * 160, // Adjusted for margin and smoothness
        easing: 'easeInOutQuad',
        duration: 100, // Adjust the duration for smoother animation
      });
    }
  }, [focusedIndex]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        id='list-container'
        ref={listContainerRef}
        style={{ display: 'flex', transition: 'transform 0.5s ease-in-out' }}
      >
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            isFocused={index === focusedIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalList;
