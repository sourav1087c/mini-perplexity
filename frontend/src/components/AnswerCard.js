// src/components/AnswerCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AnswerCard = React.forwardRef(function AnswerCard(props, ref) {
  const { answerHtml } = props;
  return (
    <Card style={{ marginTop: '20px' }} ref={ref}>
      <CardContent>
        <Typography variant="h5">Answer:</Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: answerHtml }}
          style={{ marginTop: '10px' }}
        ></Typography>
      </CardContent>
    </Card>
  );
});

export default AnswerCard;
