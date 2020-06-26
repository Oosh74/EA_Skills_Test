import React from 'react';
import {VictoryPie, VictoryTheme, VictoryTooltip} from 'victory';

export default function RetentionChart() {
  const data = [{dog: 5, cat: 4, bird: 1}];

  return (
    <VictoryPie
      innerRadius={100}
      padAngle={2}
      data={data}
      theme={VictoryTheme.material}
      labelComponent={
        <VictoryTooltip
          x={175}
          y={225}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          //   flyoutWidth={flex}
          //   flyoutHeight={flex}
          flyoutStyle={{fill: 'white'}}
        />
      }
    />
  );
}
