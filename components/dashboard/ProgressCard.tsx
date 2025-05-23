import { FC, useEffect, useState } from "react";

interface ProgressCardProps {
  percent: number; // 0 to 100
  yesterdayMinutes: string;
}

// Set your "full day" time in minutes (e.g., 8 hours = 480 minutes)
const MAX_MINUTES = 480;

// Format minutes to "xh ym"
const formatTimeFromMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const ProgressCard: FC<ProgressCardProps> = ({ percent, yesterdayMinutes }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const newOffset = circumference - (percent / 100) * circumference;
    const timeout = setTimeout(() => {
      setOffset(newOffset);
    }, 100); // smooth entry
    return () => clearTimeout(timeout);
  }, [percent, circumference]);

  // Determine stroke color based on percent
  let strokeColor = "#16a34a"; // green-600
  if (percent < 33.33) {
    strokeColor = "#dc2626"; // red-600
  } else if (percent < 66.66) {
    strokeColor = "#facc15"; // yellow-400
  }

  const computedMinutes = Math.round((percent / 100) * MAX_MINUTES);
  const formattedTime = formatTimeFromMinutes(computedMinutes);

  return (
    <div className="bg-[var(--card)] p-4 rounded-xl flex flex-col w-full items-center">
      <h2 className="font-medium self-start">Today</h2>

      {/* Circular Chart */}
      <div className="my-5 flex justify-center items-center">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="max-w-[200px] aspect-square"
        >
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[var(--black)] text-md font-semibold"
          >
            {formattedTime}
          </text>
        </svg>
      </div>

      <p className="text-sm text-orange-500 mt-1">
        {percent}% yesterday
        <span className="bg-purple-200 text-purple-700 text-xs px-2 py-0.5 rounded ml-1">
          {yesterdayMinutes}
        </span>
      </p>
    </div>
  );
};

export default ProgressCard;
