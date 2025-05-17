import { useState } from 'react';
import { BarChart, AreaChart } from '.';
type Props = {
  data: { date: string; count: number }[];
  className?: string;
};
export default function ChartsContainers({ data, className }: Props) {
  const [barChart, setBarChart] = useState(true);
  return (
    <section className={`${className}`}>
      <div className='text-center'>
        <h2 className='text-xl font-bold text-slate-700 dark:text-slate-200'>
          Monthly Applications
        </h2>
        <button
          className='text-xl text-green-800 dark:text-green-200 font-semibold'
          onClick={() => setBarChart(!barChart)}
          aria-label={`Display monthly applications in ${
            barChart ? 'Area Chart' : 'Bar Chart'
          }`}
        >
          {barChart ? 'Area Chart' : 'Bar Chart'}
        </button>
      </div>
      <div className='p-10'>
        {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
      </div>
    </section>
  );
}
