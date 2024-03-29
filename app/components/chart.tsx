import { createChart, ColorType, ISeriesApi } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface ChartComponentProps {
  data: Array<{ time: string; open: number; high: number; low: number; close: number }>;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
  };
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ data, colors }) => {
  const {
    backgroundColor = '#020817',
    textColor = 'white',
  } = colors || {};

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
      }
    };

    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 600,
      });
      chartRef.current = chart;

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
      candlestickSeries.setData(data);
      chart.timeScale().fitContent();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, [data, backgroundColor, textColor]);

  return <div ref={chartContainerRef} />;
};
