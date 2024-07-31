import { MutableRefObject, useEffect } from "react";

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  fn: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, fn]);
};

export default useOutsideClick;
