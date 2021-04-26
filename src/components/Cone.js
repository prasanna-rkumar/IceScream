export default function Cone() {
  return (
    <svg style={{
      marginTop: -40
    }} height="204" width="150">
      <polygon
        points="4,0 146,4 75,200"
        style={{
          fill: "bisque",
          stroke: "tan",
          strokeWidth: 4,
        }}
      />
      {[0, 0, 0].map((_, index) => (
        <line x1={38 * (index + 1)} y1="3" x2="75" y2="200" style={{
          stroke: "tan",
          strokeWidth: 4,
        }} />
      ))}
      {[0, 0, 0, 0].map((_, index) => (
        <line x1={16 + index * 16} y1={38 * (index + 1)} x2={150 - 16 - index * 16} y2={38 * (index + 1)} style={{
          stroke: "tan",
          strokeWidth: 4,
        }} />
      ))}
    </svg>
  )
};
