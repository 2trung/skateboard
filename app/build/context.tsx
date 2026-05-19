'use client'
import { createContext, useContext, useMemo, useState } from 'react'

type CustomizerControlsContext = {
  selectedWheel?: string
  setWheel?: (wheel: string) => void
  selectedDeck?: string
  setDeck?: (deck: string) => void
  selectedTruck?: string
  setTruck?: (truck: string) => void
  selectedBolt?: string
  setBolt?: (bolt: string) => void
}

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
}

const CustomizerControlsContext =
  createContext<CustomizerControlsContext>(defaultContext)

type CustomizerControlsProviderProps = {
  defaultWheel?: string
  defaultDeck?: string
  defaultTruck?: string
  defaultBolt?: string
  children?: React.ReactNode
}

export function CustomizerControlsProvider(
  props: CustomizerControlsProviderProps,
) {
  const [selectedWheel, setWheel] = useState<string | undefined>(
    props.defaultWheel,
  )
  const [selectedDeck, setDeck] = useState<string | undefined>(
    props.defaultDeck,
  )
  const [selectedTruck, setTruck] = useState<string | undefined>(
    props.defaultTruck,
  )
  const [selectedBolt, setBolt] = useState<string | undefined>(
    props.defaultBolt,
  )

  const value = useMemo<CustomizerControlsContext>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    }
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt])
  return (
    <CustomizerControlsContext.Provider value={value}>
      {props.children}
    </CustomizerControlsContext.Provider>
  )
}

export function useCustomizerControls<
  T extends CustomizerControlsContext,
>(): T {
  return useContext(CustomizerControlsContext) as T
}
