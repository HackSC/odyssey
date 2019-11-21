import { useMedia } from "react-use";

function useIsMobile() {
  return useMedia("(max-width: 480px");
}

export { useIsMobile };
