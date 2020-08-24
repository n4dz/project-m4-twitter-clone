import React from "react";
import Sidebar from "./components/Sidebar";

import { CurrentUserContext } from "./components/CurrentUserContext";

export default function App() {
  const { status } = React.useContext(CurrentUserContext);

  if (status === "loading") {
    return <p>Loading</p>;
  } else {
    return (
      <>
        {/* // <GlobalStyles>// </GlobalStyles> */}
        <Sidebar></Sidebar>
      </>
    );
  }
}
