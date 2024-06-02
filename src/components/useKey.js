import { useEffect } from "react";
export function useKey(key, callBack) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          callBack?.();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, callBack]
  );
}
