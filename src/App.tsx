import "./global.css";
import MainRoutes from "./routes";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ScrollToTop from "./helpers/ScrollToTop";

const persistor = persistStore(store);

const App = () => {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop/>
          <MainRoutes />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
