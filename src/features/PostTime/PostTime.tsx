import React, { useMemo } from 'react';
import { Text } from 'react-native-paper';
import { formatPostDate } from '../utils/dateUtils';

const PostTime = ({ createdAt }:{createdAt:any}) => {
  const formattedDate = useMemo(() => formatPostDate(createdAt), [createdAt]);

  return <Text>{formattedDate}</Text>;
  
};

export default React.memo(PostTime) ;
