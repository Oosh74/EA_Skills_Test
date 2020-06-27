import React from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryBar,
  VictoryAxis,
} from 'victory';
import {Container, Typography} from '@material-ui/core';

export default function RetChart(props) {
  const data = [];

  for (let key in props.retentionData) {
    if (
      props.retentionData[key] !== null &&
      Math.ceil(props.retentionData[key] * 100) > 0
    ) {
      data.push({x: key, y: Math.ceil(props.retentionData[key] * 100)});
    }
  }

  return (
    <Container>
      <Typography variant="h6" color="primary">
        Chart
      </Typography>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Part Time', 'Full Time', 'P.T Pooled', 'F.T Pooled']}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x * 1}%`} />
        <VictoryBar
          data={data}
          labels={({datum}) => `${datum.x}: ${datum.y}%`}
          labelComponent={
            <VictoryTooltip
              constrainToVisibleArea
              style={{
                fill: 'white',
                fontSize: 11,
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                color: 'white',
              }}
              cornerRadius={0}
              flyoutStyle={{
                fill: '#3f51b5',
                stroke: 'white',
                strokeWidth: 1,
              }}
            />
          }
        />
      </VictoryChart>
    </Container>
  );
}
