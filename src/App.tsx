import React from "react";
import GlobalStyle from "@src/GlobalStyle";
import HiThere from "./Components/HiThere";
import AppVersionSync from "./VersionController";

export default async function Index() {
  await AppVersionSync();

  return (
    <>
      <GlobalStyle />
      <HiThere />
    </>
  );
}
