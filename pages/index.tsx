import React from "react";
import Layout from "../components/Layout";
import { inject } from "mobx-react";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { DataStore } from "../stores/DataStores";

type Props = {
  dataStore?: DataStore;
};

const IndexPage: NextPage = inject("dataStore")(
  observer((props: Props) => {
    const dataStore = props.dataStore!;

    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <h1>Header</h1>

        <p>{dataStore.title}</p>

        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dataStore.changeTitle(e.target.value)
          }
        />
      </Layout>
    );
  })
);

export default IndexPage;
