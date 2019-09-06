import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const mockNativeEvent: NativeScrollEvent = {
  contentInset: { right: 0, top: 0, left: 0, bottom: 0 },
  contentOffset: { y: 0, x: 0 },
  contentSize: { width: 0, height: 0 },
  layoutMeasurement: { width: 0, height: 0 },
  zoomScale: 0,
};

export function createMockNativeEvent(
  nativeScrollEvent: Partial<NativeScrollEvent>
): NativeScrollEvent {
  return {
    ...mockNativeEvent,
    ...nativeScrollEvent,
  };
}

const mockScrollEvent: NativeSyntheticEvent<NativeScrollEvent> = {
  nativeEvent: mockNativeEvent,
  preventDefault: jest.fn((): boolean => true),
  stopPropagation: jest.fn((): boolean => true),
  persist: jest.fn((): boolean => true),
  type: 'type',
  target: 0,
  currentTarget: 0,
  eventPhase: 0,
  bubbles: true,
  cancelable: true,
  timeStamp: 0,
  defaultPrevented: true,
  isTrusted: true,
  isDefaultPrevented: jest.fn((): boolean => true),
  isPropagationStopped: jest.fn((): boolean => true),
};

export default mockScrollEvent;
