import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css"; // Necessary ???
import "./index.scss";

const MyFlixApp = () => {
  return (
    <div style={{ backgroundColor: "beige" }}>
      <Container>
        <MainView />
      </Container>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApp />);