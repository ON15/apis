import { useEffect } from "react";

export function useDocumentTitle(text) {
  useEffect(() => {
    document.title = text;
  }, [text]);
}
