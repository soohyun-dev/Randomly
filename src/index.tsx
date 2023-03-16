import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { MantineProvider } from '@mantine/core'
import store from './store'
import App from './App'

export const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <App />
                </MantineProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
