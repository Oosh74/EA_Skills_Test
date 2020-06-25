import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function SchoolInfo(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" color="primary">
        {props.school.name}
      </Typography>
      <Typography variant="body1">City: {props.school.city}</Typography>
      <Typography variant="body1">State: {props.school.state}</Typography>
      <Typography variant="body1">Zip: {props.school.zip}</Typography>
      <Typography variant="body1">
        Students: {props.total.grad_12_month + props.total.undergrad_12_month}
      </Typography>
      <Typography color="textSecondary">{props.school.school_url}</Typography>
    </React.Fragment>
  );
}
