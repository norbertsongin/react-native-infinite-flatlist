import { FlatList, NativeScrollEvent } from 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

import InfiniteFlatList from '../InfiniteFlatList';
import mockScrollEvent, {
  createMockNativeEvent,
} from '../__mocks__/mockScrollEvent';

export function simulateScrollEvents(
  wrapper: renderer.ReactTestRenderer,
  nativeEvents: NativeScrollEvent[]
): void {
  act(() => {
    const instance = wrapper.root;
    expect(instance).toBeTruthy();
    if (!instance) {
      return;
    }

    const onScrollBeginDrag =
      instance.findByType(FlatList).props.onScrollBeginDrag || jest.fn();
    const onScroll = instance.findByType(FlatList).props.onScroll || jest.fn();
    const onEndReached =
      instance.findByType(FlatList).props.onEndReached || jest.fn();

    onScrollBeginDrag(mockScrollEvent);

    for (const nativeEvent of nativeEvents) {
      const scrollEvent = {
        ...mockScrollEvent,
        nativeEvent,
      };
      onScroll(scrollEvent);
    }

    onEndReached({ distanceFromEnd: 0 });
  });
}

describe('InfiniteFlatList works', (): void => {
  it('renders', (): void => {
    const wrapper = renderer.create(
      <InfiniteFlatList
        data={[]}
        refreshing={false}
        onRefresh={jest.fn()}
        renderItem={jest.fn((): null => null)}
      />
    );

    expect(wrapper.root).toBeTruthy();
  });

  it("have FlatList as it's only child", (): void => {
    const wrapper = renderer.create(
      <InfiniteFlatList
        data={[]}
        refreshing={false}
        onRefresh={jest.fn()}
        renderItem={jest.fn((): null => null)}
      />
    );

    const instance = wrapper.root;
    expect(instance).toBeTruthy();
    if (!instance) {
      return;
    }

    expect(instance.children.length).toEqual(1);

    const flatList = instance.findAllByType(FlatList);
    expect(flatList.length).toEqual(1);
  });

  it("onReachEnd doesn't fire when not scrolling", (): void => {
    const onLoadMoreHandler = jest.fn();

    const wrapper = renderer.create(
      <InfiniteFlatList
        data={[]}
        refreshing={false}
        onRefresh={jest.fn()}
        renderItem={jest.fn((): null => null)}
        onLoadMore={onLoadMoreHandler}
      />
    );

    const nativeEvents: NativeScrollEvent[] = [
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: 0,
        },
      }),
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: 0,
        },
      }),
    ];

    simulateScrollEvents(wrapper, nativeEvents);

    expect(onLoadMoreHandler).toBeCalledTimes(0);
  });

  it("onReachEnd doesn't fire when scrolling up", (): void => {
    const onLoadMoreHandler = jest.fn();

    const wrapper = renderer.create(
      <InfiniteFlatList
        data={[]}
        refreshing={false}
        onRefresh={jest.fn()}
        renderItem={jest.fn((): null => null)}
        onLoadMore={onLoadMoreHandler}
      />
    );

    const nativeEvents: NativeScrollEvent[] = [
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: 0,
        },
      }),
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: -1,
        },
      }),
    ];

    simulateScrollEvents(wrapper, nativeEvents);

    expect(onLoadMoreHandler).toBeCalledTimes(0);
  });

  it('onReachEnd fires once when scrolling down', (): void => {
    const onLoadMoreHandler = jest.fn();

    const wrapper = renderer.create(
      <InfiniteFlatList
        data={[]}
        refreshing={false}
        onRefresh={jest.fn()}
        renderItem={jest.fn((): null => null)}
        onLoadMore={onLoadMoreHandler}
      />
    );

    const nativeEvents: NativeScrollEvent[] = [
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: 0,
        },
      }),
      createMockNativeEvent({
        contentOffset: {
          x: 0,
          y: 1,
        },
      }),
    ];

    simulateScrollEvents(wrapper, nativeEvents);

    expect(onLoadMoreHandler).toBeCalledTimes(1);
  });

  //   it('onReachEnd fires once when scrolling down multiple times', (): void => {
  //     const onLoadMoreHandler = jest.fn();

  //     const wrapper = renderer.create(
  //       <InfiniteFlatList
  //         data={[]}
  //         refreshing={false}
  //         onRefresh={jest.fn()}
  //         renderItem={jest.fn((): null => null)}
  //         onLoadMore={onLoadMoreHandler}
  //       />
  //     );

  //     const nativeEvents: NativeScrollEvent[] = [
  //       createMockNativeEvent({
  //         contentOffset: {
  //           x: 0,
  //           y: 0,
  //         },
  //       }),
  //       createMockNativeEvent({
  //         contentOffset: {
  //           x: 0,
  //           y: 1,
  //         },
  //       }),
  //       createMockNativeEvent({
  //         contentOffset: {
  //           x: 0,
  //           y: 0,
  //         },
  //       }),
  //       createMockNativeEvent({
  //         contentOffset: {
  //           x: 0,
  //           y: 1,
  //         },
  //       }),
  //     ];

  //     simulateScrollEvents(wrapper, nativeEvents);

  //     expect(onLoadMoreHandler).toBeCalledTimes(1);
  //   });
});
