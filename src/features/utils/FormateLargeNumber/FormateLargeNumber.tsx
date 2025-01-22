import React, { useMemo } from 'react';
import { Text } from 'react-native-paper';
import { formatLargeNumber } from '../mainUtils';

const FormateLargeNumber = ({ number }: { number: number }) => {
  const formattedNumber = useMemo(() => formatLargeNumber(number), [number]);

  return <Text>  {formattedNumber}</Text>;
};

export default React.memo(FormateLargeNumber);
