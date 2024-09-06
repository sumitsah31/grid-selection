import { useCallback, useState } from "react";

interface gridSelectionProps {
  row: number;
  coloumn: number;
}

export default function GridSelection({
  coloumn = 10,
  row = 10,
}: gridSelectionProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const handleMouseDown = (index: number) => {
    console.log(index);
    setIsMouseDown(true);
    setSelected([index]);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (isMouseDown) {
        const startBox = selected[0];
        const endBox = index;

        const startRow = Math.floor((startBox - 1) / coloumn); // Math.floor((23-1)/10) = 2
        const startCol = (startBox - 1) % coloumn; // (23 -1)%10 = 22 % 10 = 2
        const endRow = Math.floor((endBox - 1) / coloumn);
        const endCol = (endBox - 1) % coloumn;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const selectedRows = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selectedRows.push(row * coloumn + col + 1);
          }
        }
        setSelected(selectedRows);
      }
    },
    [isMouseDown]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${coloumn}, 35px)`,
        gridTemplateRows: `repeat(${row},35px )`,
        gap: "10px",
        backgroundColor: "white",
        userSelect: "none",
      }}
      onMouseUp={() => handleMouseUp()}
    >
      {Array.from({ length: coloumn * row }).map((_, i) => (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            display: "grid",
            justifyContent: "center",
            color: "black",
            backgroundColor: selected.includes(i) ? "lightblue" : "transparent",
          }}
          onMouseDown={() => handleMouseDown(i)}
          onMouseEnter={() => handleMouseEnter(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
