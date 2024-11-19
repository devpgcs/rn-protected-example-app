import {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export default function WrapperView({
  children,
  ...props
}: PropsWithChildren<ViewProps>) {
  return <View style={[style.container, props.style]}>{children}</View>;
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});
