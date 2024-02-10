import {
    Canvas,
    Circle,
    Group,
    Path,
    Skia,
    rect,
    rrect,
    useClockValue,
    useComputedValue,
    useValue,
  } from '@shopify/react-native-skia';
  import {curveBasis, line} from 'd3';
  import React, {useEffect} from 'react';
  
  const Progress = ({size = 256, progress = 90}) => {
    const r = size / 2;
    const padding = size / 25;
    const outerCircleRadius = r - padding / 2;
    const innerCircleSize = size - padding * 2;
    const frequency = 2;
    const amplitude = 2;
    const verticalOffset = useValue(100);
    const clock = useClockValue();
  
    useEffect(() => {
      verticalOffset.current = (1 - progress / 100) * innerCircleSize;
    }, [progress, size, innerCircleSize]);
  
    const createAnimatedPath = (phase = 20) => {
      const d3Points = Array.from({length: size}).map((_, i) => {
        const angle = (i / size) * (Math.PI * frequency) + phase;
        return [i, (Math.sin(angle) * amplitude) / 2 + verticalOffset.current];
      });
      const lineGenerator = line().curve(curveBasis);
      const wavePath = lineGenerator(d3Points);
      return `${wavePath} L ${size}, ${size} ${0}, ${size} Z`;
    };
  
    const animatedPath = useComputedValue(() => {
      const current = (clock.current / 300) % 200;
      const start = Skia.Path.MakeFromSVGString(createAnimatedPath(current));
      const end = Skia.Path.MakeFromSVGString(
        createAnimatedPath(current * Math.PI),
      );
      return start.interpolate(end, 0.5);
    }, [clock, progress, size]);
  
    const roundedRectangle = rrect(
      rect(padding, padding, innerCircleSize, innerCircleSize),
      r,
      r,
    );
  
    return (
      <Canvas style={{width: size, height: size}}>
        <Circle
          cx={r}
          cy={r}
          r={outerCircleRadius}
          style="stroke"
          strokeWidth={padding}
          color="#A9A9A9" 
        />
        <Group clip={roundedRectangle}>
          <Path path={animatedPath} color="#0077a8" />
        </Group>
      </Canvas>
    );
  };
  
  export default Progress;