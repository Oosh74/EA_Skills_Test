import React from 'react';
import {Container, Typography} from '@material-ui/core';

export default function Welcome() {
  return (
    <Container>
      <Typography variant="h3" color="primary">
        Welcome.
      </Typography>
      <Typography variant="h6">
        This is your dashboard. Here you will find important news and info.
      </Typography>
      <Typography variant="body1" paragraph>
        On the right you will see the university that is currently selected.
        Open the navigation panel on the left to begin visualizing data and the
        bottom navigation bar for retrieval options.
      </Typography>
      <Typography color="textSecondary" variant="subtitle2">
        Please contact usherjared@yahoo.com for support, and thank you for
        choosing Education Analytics.
      </Typography>
    </Container>
  );
}
