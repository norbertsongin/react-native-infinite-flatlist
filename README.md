# react-native-infinite-flatlist

InfiniteFlatList is a React Native's FlatList with additional `onLoadMore` prop for infinite scroll. Major dif

## Why would I use it instead of FlatList's `onEndReached`?

Because `onEndReached` doesn't respect if user is even scrolling down and in certain cases it's getting called on initial render.

In comparison `react-native-infinite-flatlist` additional `onLoadMore` prop is getting called once per scroll gesture, only when user is scrolling downwards.

## Installation

```sh
npm install react-native-infinite-flatlist
```

```sh
yarn add react-native-infinite-flatlist
```

## Usage

```js
import InfiniteFlatList from 'react-native-infinite-flatlist';


class Items extends React.Component {
    render() {
        ...
        return (
            <InfiniteFlatList
              data={items}
              renderItem={this.renderItem}
              onLoadMore={this.fetchNextPage}
            />
        );
    }
}
```
