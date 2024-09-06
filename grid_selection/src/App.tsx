import GridSelection from "./grid-layout";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GridSelection coloumn={10} row={10} />
    </div>
  );
}

export default App;
