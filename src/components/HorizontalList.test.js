import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect';
import HorizontalList from './HorizontalList';
import { fetchListItems, focusNextItem, focusPrevItem } from '../redux/slice';

// Mock the animejs library
jest.mock('animejs', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  list: {
    items: [],
    focusedIndex: 0,
    status: 'idle',
  },
};

const renderComponent = (store) => {
  render(
    <Provider store={store}>
      <HorizontalList />
    </Provider>
  );
};

describe('HorizontalList', () => {
  it('should render and fetch items on mount', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    // Check if fetchListItems is dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(fetchListItems());

    // Check if the list container is rendered
    expect(screen.getByTestId('list-container')).toBeInTheDocument();
  });

  it('should dispatch focusNextItem on ArrowRight keydown', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    const actions = store.getActions();
    expect(actions).toContainEqual(focusNextItem());
  });

  it('should dispatch focusPrevItem on ArrowLeft keydown', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    const actions = store.getActions();
    expect(actions).toContainEqual(focusPrevItem());
  });

  it('should animate when the focusedIndex changes', () => {
    const store = mockStore({
      list: {
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        focusedIndex: 0,
        status: 'succeeded',
      },
    });

    renderComponent(store);

    // Change the focused index
    store.dispatch(focusNextItem());
    store.dispatch(focusNextItem());

    // Check if animejs is called
    expect(require('animejs').default).toHaveBeenCalled();
  });

  it('should render list items correctly', () => {
    const store = mockStore({
      list: {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
        focusedIndex: 0,
        status: 'succeeded',
      },
    });

    renderComponent(store);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
