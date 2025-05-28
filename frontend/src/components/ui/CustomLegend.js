const CustomLegend = ({ payload }) => {
  return (
    <div className="text-sm">
      <h3 className="mb-3 text-lg font-semibold">Categories</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>
              {entry.value.replace(
                /\w\S*/g,
                (text) =>
                  text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomLegend;
