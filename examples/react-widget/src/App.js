import "./App.css";
import { OnsetWidget } from "@onsetio/widget";

function App() {
  const widget = new OnsetWidget({
    page: "releases.onset.io",
  });

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => widget.openWidget()}>Show widget</button>
        <button onClick={() => widget.closeWidget()}>Hide widget</button>
        <button onClick={() => widget.openPopup("latest")}>
          Show latest popup
        </button>
        <button onClick={() => widget.closePopup()}>Hide popup</button>
      </header>
    </div>
  );
}

export default App;
