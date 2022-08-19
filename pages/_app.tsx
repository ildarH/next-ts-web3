import React from "react"
import '../styles/globals.css'
import App from "next/app"
import { Provider } from "mobx-react";
import { fetchInitialStoreState, DataStore } from "../stores/DataStores";
import {IDataStoreState} from "../types";

class MyApp extends App {
  state = {
    dataStore: new DataStore()
  };

  // Fetching serialized(JSON) store state
  static async getInitialProps (appContext: any) {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();

    return {
      ...appProps,
      initialStoreState
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps (props: any, state: IDataStoreState) {
    state.dataStore.hydrate(props.initialStoreState);
    return state;
  }

  render () {
    const { Component, pageProps } = this.props;
    return (
      <Provider dataStore={this.state.dataStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
