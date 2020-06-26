import React from 'react';
import {VictoryPie, VictoryTheme, VictoryTooltip} from 'victory';

export default function ProgramPercentages(props) {
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
