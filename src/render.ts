import type React from "react";
import reconciler from "./reconciler";

export function render(element: React.ReactElement) {
  const container = {
    type: "root",
    props: {},
    children: [],
  };

  const node = reconciler.createContainer(
    container, // containerInfo
    0, // tag (0 = legacy)
    null, // hydrationCallbacks
    false, // isStrictMode
    false, // concurrentUpdatesByDefaultOverride
    "", // identifierPrefix
    () => {}, // onRecoverableError
    null // transitionCallbacks
  );

  reconciler.updateContainer(element, node, null, () => {
    // console.log("Test tree execution complete");
  });
}
