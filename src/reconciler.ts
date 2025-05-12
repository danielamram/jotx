import ReactReconciler from "react-reconciler";

type TestNode = {
  type: string;
  props: Record<string, any>;
  children: TestNode[];
};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  getPublicInstance: (instance: TestNode) => instance,
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  createInstance: (type: string, props: any) => {
    return {
      type,
      props,
      children: [],
    };
  },
  appendInitialChild: (parent: TestNode, child: TestNode) => {
    parent.children.push(child);
  },
  appendChild: (parent: TestNode, child: TestNode) => {
    parent.children.push(child);
  },
  appendChildToContainer: (container: TestNode, child: TestNode) => {
    container.children.push(child);
  },
  finalizeInitialChildren: () => false,
  prepareUpdate: () => null,
  shouldSetTextContent: () => false,
  createTextInstance: (text: string) => {
    return {
      type: "text",
      props: { text },
      children: [],
    };
  },
  supportsMutation: true,
  commitUpdate: () => {},
  commitTextUpdate: () => {},
  removeChild: () => {},
  removeChildFromContainer: () => {},
  insertBefore: () => {},
  clearContainer: (container: any) => {
    container.children = [];
  },
};

const reconciler = ReactReconciler(hostConfig as any);

export default reconciler;
