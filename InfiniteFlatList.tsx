import React, { useState, useRef, forwardRef, RefObject, Ref } from 'react';
import {
  FlatList,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

export interface InfiniteFlatListProps<T> extends FlatListProps<T> {
  onLoadMore?: () => void;
}

function InfiniteFlatList<T>(
  props: InfiniteFlatListProps<T>,
  ref: Ref<FlatList<T>>
): React.ReactElement {
  const {
    onRefresh,
    onEndReached,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onLoadMore,
  } = props;

  const [endReached, setEndReached] = useState(false);
  const scrollingDown = useRef(false);
  const listOffset = useRef(0);

  function handleRefresh(): void {
    setEndReached(true);
    if (onRefresh) {
      onRefresh();
    }
  }

  function handleEndReached(info: { distanceFromEnd: number }): void {
    if (onEndReached) {
      onEndReached(info);
    }

    if (!endReached && scrollingDown.current) {
      setEndReached(true);
      if (onLoadMore) {
        onLoadMore();
      }
    }
  }

  function handleScrollBeginDrag(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void {
    setEndReached(false);
    if (onScrollBeginDrag) {
      onScrollBeginDrag(event);
    }
  }

  function handleScrollEndDrag(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void {
    setEndReached(true);
    if (onScrollEndDrag) {
      onScrollEndDrag(event);
    }
  }

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void {
    scrollingDown.current = listOffset.current < e.nativeEvent.contentOffset.y;
    listOffset.current = e.nativeEvent.contentOffset.y;
    if (onScroll) {
      onScroll(e);
    }
  }

  return (
    <FlatList<T>
      {...props}
      ref={ref}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      extraData={endReached}
      onScroll={handleScroll}
    />
  );
}

export default forwardRef(InfiniteFlatList);
