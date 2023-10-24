import { useEffect, useRef } from "react"

export function useHandleScroll(onScrollDown: () => void, onScrollUp: () => void) {
  const timerIdRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    function handleScroll(event: WheelEvent) {
      clearTimeout(timerIdRef.current)

      timerIdRef.current = setTimeout(() => {
        if (event.deltaY > 0) {
          onScrollDown()
        } else if (event.deltaY <= -1) {
          onScrollUp()
        }
      }, 320)
    }

    document.addEventListener("wheel", handleScroll)

    return function () {
      document.removeEventListener("wheel", handleScroll)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
