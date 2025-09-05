import { persister, store } from "@configs/store";
// import ErrorDialog from "@share/components/organisms/ErrorDialog";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundaryApp from "./ErrorBoundaryApp";
import NavigationApp from "./NavigationApp";
import QueryApp from "./QueryApp";

/**
 * Renders the ContainerApp component.
 *
 * @returns The rendered ContainerApp component.
 */
export default function ContainerApp() {
    return (
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persister}>
                    <ErrorBoundaryApp>
                        <QueryApp>
                            <ToastContainer
                                position={"bottom-center"}
                                toastClassName="custom-toast"
                                transition={Zoom}
                                autoClose={2000}
                                hideProgressBar
                                closeButton={false}
                                stacked
                            />
                            <NavigationApp />
                            {/* <ErrorDialog /> */}
                        </QueryApp>
                    </ErrorBoundaryApp>
                </PersistGate>
            </Provider>
        </StrictMode>
    );
}
