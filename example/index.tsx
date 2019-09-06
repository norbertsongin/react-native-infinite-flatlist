import React, { ReactElement, useState } from 'react';
import { Text, ActivityIndicator, ListRenderItemInfo } from 'react-native';

import InfiniteFlatList from '../InfiniteFlatList';

const foo: string = 'foo';

type Foo = typeof foo;

export default function FooList(): any {
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([foo]);

  function loadMore(): void {
    setLoadingMore(true);

    const newData = [...data, foo];
    setData(newData);

    setLoadingMore(false);
  }

  function renderItem(info: ListRenderItemInfo<Foo>): ReactElement {
    return (
      <Text>
        {info.index}. {info.item}
      </Text>
    );
  }

  function renderListFooter(): ReactElement | null {
    return loadingMore ? <ActivityIndicator /> : null;
  }

  return (
    <InfiniteFlatList<Foo>
      data={data}
      renderItem={renderItem}
      onEndReachedThreshold={0.3}
      onLoadMore={loadMore}
      ListFooterComponent={renderListFooter()}
    />
  );
}
