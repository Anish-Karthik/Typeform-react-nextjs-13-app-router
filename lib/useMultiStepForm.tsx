import { ReactElement, useState } from "react"
export type multiStepHooksType = {
  prev: number
  currentStepIndex: number
  step: ReactElement
  steps: ReactElement[]
  isFirstStep: boolean
  isLastStep: boolean
  goTo: (index: number) => void
  next: () => void
  back: () => boolean
  setValidIndex: (index: number, flag?: number) => void
  getFirstInvalidStep: () => number
  validCountArr: number[]
}
export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [validCountArr, setValidCountArr] = useState(new Array(9).fill(0))
  const [prev, setPrev] = useState<number>(-1)
  function next() {
    setPrev(currentStepIndex)
    setValidCountArr(validCountArr => {
      const newValidCountArr = [...validCountArr]
      newValidCountArr[currentStepIndex] = 1
      return newValidCountArr
    })
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function setValidIndex(index: number, flag = 1) {
    setValidCountArr(validCountArr => {
      const newValidCountArr = [...validCountArr]
      newValidCountArr[index] = flag
      return newValidCountArr
    })
  }

  function getFirstInvalidStep() {
    return validCountArr.findIndex(i => i === 0)
  }
  function back() {
    setPrev(currentStepIndex)
    setCurrentStepIndex(i => {
      if (i <= 0) return i
      return i - 1
    })
    return true
  }

  function goTo(index: number) {
    setPrev(currentStepIndex)
    setCurrentStepIndex(index)
  }
  const hooks: multiStepHooksType = {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    getFirstInvalidStep,
    setValidIndex,
    validCountArr,
    prev,
  }
  return hooks
}
