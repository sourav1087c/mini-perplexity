// src/components/SourcesCard.js

import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

const SourcesCard = React.forwardRef(function SourcesCard(props, ref) {
  const { sources } = props;
  return (
    <Card style={{ marginTop: '20px' }} ref={ref}>
      <CardContent>
        <Typography variant="h5">Sources:</Typography>
        {sources.map((source, index) => (
          <Typography key={index} variant="body2" style={{ marginTop: '5px' }}>
            [{index + 1}]&nbsp;
            <Link href={source.link} target="_blank" rel="noopener noreferrer">
              {source.title}
            </Link>
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
});

export default SourcesCard;
