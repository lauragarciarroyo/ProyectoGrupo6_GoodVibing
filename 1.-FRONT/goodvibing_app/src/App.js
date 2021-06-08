import logo from "./goodvibing_logo_ps02.png";

import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <ErrorBoundary
          fallback={
            <div className="products">
              No se han podido cargar los productos
            </div>
          }
        >
          <Products />
        </ErrorBoundary>
        <Cart />
      </div>
    </div>
  );
}

export default App;
