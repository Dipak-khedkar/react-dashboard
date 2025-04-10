import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { updateUser } from "./store/slicer/authSlice.ts";

if (localStorage?.user === "true") {
  store.dispatch(updateUser(true));
} else {
  store.dispatch(updateUser(false));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
