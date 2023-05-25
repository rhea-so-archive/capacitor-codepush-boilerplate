import AppVersionSync from "./VersionController";
AppVersionSync();

import React from "react";
import GlobalStyle from "@src/GlobalStyle";
import HiThere from "./Components/HiThere";

export default function Index() {
  return (
    <>
      <GlobalStyle />
      <HiThere />
    </>
  );
}
