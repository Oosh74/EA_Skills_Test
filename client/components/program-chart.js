import React from 'react';
import {VictoryPie, VictoryTheme, VictoryTooltip} from 'victory';
import {Container, Typography} from '@material-ui/core';

export default function ProgramChart(props) {
  const data = [];

  for (let key in props.programData) {
    if (
      props.programData[key] !== null &&
      Math.ceil(props.programData[key] * 100) > 0
    ) {
      data.push({x: key, y: Math.ceil(props.programData[key] * 100)});
    }
  }

  return (
    <Container>
      <Typography variant="h6" color="primary">
        Chart
      </Typography>
      <VictoryPie
        innerRadius={100}
        padAngle={2}
        data={data}
        theme={VictoryTheme.material}
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
    </Container>
  );
}
