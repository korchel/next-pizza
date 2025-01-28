import { UIEventHandler, useEffect, useRef, useState } from "react";

export const useHorizantalScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visibleArrowButtons, setVisibleArrowButtons] = useState({
    right: false,
    left: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setVisibleArrowButtons({
        right: ref.current!.scrollWidth > ref.current!.clientWidth,
        left: ref.current!.scrollLeft > 0,
      });
    }, 1000);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setVisibleArrowButtons({
        right: ref.current!.scrollWidth > ref.current!.clientWidth,
        left: ref.current!.scrollLeft > 0,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleScroll: UIEventHandler<HTMLDivElement> = (
    event: React.UIEvent<HTMLElement>
  ) => {
    setVisibleArrowButtons({
      left: event.currentTarget.scrollLeft > 0,
      right:
        event.currentTarget.scrollLeft + ref.current!.clientWidth <
        event.currentTarget.scrollWidth,
    });
  };

  const scroll = (direction: "right" | "left") => {
    if (direction === "left" && ref.current) {
      ref.current.scrollLeft -= 200;
    }
    if (direction === "right" && ref.current) {
      ref.current.scrollLeft += 200;
    }
  };

  return {
    ref,
    handleScroll,
    scroll,
    right: visibleArrowButtons.right,
    left: visibleArrowButtons.left,
  };
};
