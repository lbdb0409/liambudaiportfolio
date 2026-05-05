import { useEffect, useRef } from 'react'
import SplitType from 'split-type'

export default function useSplitText(ref, type = 'words') {
  const splitRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const split = new SplitType(ref.current, { types: type })
    splitRef.current = split

    return () => {
      if (split) split.revert()
    }
  }, [ref, type])

  return splitRef
}
