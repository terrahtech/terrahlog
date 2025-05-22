import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaChartLine } from "react-icons/fa";

interface WeeklyBarChartCardProps {
  percentChange: number; // e.g., -29
  lastWeekTime: string; // e.g., "39h 30m"
}

// Helper function to get bar color based on hours
const getBarColor = (hours: number) => {
  if (hours < 4) return "#ef4444"; // red
  if (hours < 7) return "#f59e0b"; // yellow
  return "#22c55e"; // green
};

// Weekly data with dynamic fill colors
const data = [
  { name: 'Mon', hours: 5, fill: getBarColor(5) },
  { name: 'Tue', hours: 8, fill: getBarColor(8) },
  { name: 'Wed', hours: 3, fill: getBarColor(3) },
  { name: 'Thu', hours: 4, fill: getBarColor(4) },
  { name: 'Fri', hours: 5, fill: getBarColor(5) },
];

// Get overall icon/text color based on percent change
const getOverallColor = (percentChange: number) => {
  const absPercent = Math.abs(percentChange);
  if (absPercent < 33) return "#ef4444";
  if (absPercent < 66) return "#f59e0b";
  return "#22c55e";
};

// Format hours to "xh ym" format
const formatTime = (totalHours: number) => {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const WeeklyBarChartCard: FC<WeeklyBarChartCardProps> = ({
  percentChange,
  lastWeekTime,
}) => {
  const overallColor = getOverallColor(percentChange);

  // Calculate total time
  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
  const formattedTime = formatTime(totalHours);

  return (
    <div className="bg-[var(--card)] p-4 rounded-xl flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">This Week</h2>
        <FaChartLine style={{ color: overallColor, fontSize: 24 }} />
      </div>

      <p className="text-3xl font-semibold mt-2">{formattedTime}</p>

      {/* Bar Chart */}
      <div className="mt-4 w-full h-40 my-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm" style={{ color: overallColor }}>
        {percentChange}% Last week
        <span className="bg-purple-200 text-purple-700 text-xs px-2 py-0.5 rounded ml-1">
          {lastWeekTime}
        </span>
      </p>
    </div>
  );
};

export default WeeklyBarChartCard;
