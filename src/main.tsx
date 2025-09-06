import ContainerApp from '@app/ContainerApp';
import envConfig from '@configs/env';
import * as ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './main.scss';

import '@css/main.css';

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

/**
 * Enables mocking if the environment is set to "mock".
 * This function imports the browser module and starts the mocking process.
 */
async function startMocking() {
    if (envConfig.env !== 'mock') {
        return;
    }
    const browser = (await import('./mocks/browser')).default;
    browser.start();
}

/**
 * Starts the application.
 *
 * @returns A promise that resolves when the application has started.
 */
async function startApp(): Promise<void> {
    await startMocking();

    const rootElement = document.getElementById('root');
    if (!rootElement) {
        return;
    }

    ReactDOM.createRoot(rootElement).render(<ContainerApp />);
}

void startApp();
