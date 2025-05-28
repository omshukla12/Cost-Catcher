const COLORS = [
  "#FF6B6B", // Vibrant Red
  "#4ECDC4", // Aqua
  "#556FB5", // Blue
  "#FFD166", // Yellow
  "#6B46C1", // Purple
  "#43AA8B", // Green
  "#FF8C42", // Orange
];

// Hash-based color picker for user by name
const getColorFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

const NewAvatar = ({ name, size, round, color }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center text-white ${
        round ? "rounded-full" : ""
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color || getColorFromName(name),
      }}
    >
      <span className="text-3xl font-medium">{initials}</span>
    </div>
  );
};

export default NewAvatar;
