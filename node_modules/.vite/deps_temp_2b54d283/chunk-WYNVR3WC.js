import {
  require_jsx_runtime
} from "./chunk-CRNJR6QK.js";
import {
  require_react
} from "./chunk-ZMLY2J2T.js";
import {
  __toESM
} from "./chunk-4B2QHNJT.js";

// node_modules/@radix-ui/react-direction/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DirectionContext = React.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

export {
  useDirection
};
//# sourceMappingURL=chunk-WYNVR3WC.js.map
