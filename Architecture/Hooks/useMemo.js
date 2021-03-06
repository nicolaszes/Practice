let lastMemo
let memoizedState = [];
let currentCursor = 0;

function useMemo(fn, watch) {
  let hasWatchChange = memoizedState[currentCursor] ?
    !watch.every((item, index) => item === memoizedState[currentCursor][index]) :
    true
  if (hasWatchChange) {
    lastMemo = fn()
    memoizedState[currentCursor++] = watch
  }
  return lastMemo
}