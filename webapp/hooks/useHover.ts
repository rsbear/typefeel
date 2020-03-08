import { useState, useCallback, useRef } from 'react'

// Hook
const useHover = <T extends HTMLElement>(): [
  (node?: T | null) => void,
  boolean,
] => {
  const [value, setValue] = useState(false)

  const handleMouseOver = useCallback(() => setValue(true), [])
  const handleMouseOut = useCallback(() => setValue(false), [])

  const ref = useRef<T>()

  const callbackRef = useCallback<(node?: null | T) => void>(
    node => {
      if (ref.current) {
        ref.current.removeEventListener(
          'mouseover',
          handleMouseOver,
        )
        ref.current.removeEventListener(
          'mouseout',
          handleMouseOut,
        )
      }

      ref.current = node || undefined

      if (ref.current) {
        ref.current.addEventListener(
          'mouseover',
          handleMouseOver,
        )
        ref.current.addEventListener('mouseout', handleMouseOut)
      }
    },
    [handleMouseOver, handleMouseOut],
  )

  return [callbackRef, value]
}

export default useHover