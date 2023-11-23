import React from 'react';
import { Text } from '@react-three/drei';

const MyText = ({ children, ...props }) => {
  return (
    <Text {...props}>
      {children}
    </Text>
  );
};

export default MyText;
