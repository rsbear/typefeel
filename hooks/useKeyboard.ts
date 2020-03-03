import React, { useState, useEffect, useReducer, SetStateAction } from 'react'

export interface Keyboard {
  angle: string;
  connector: string
  firmware: string
  mount: string
  pcb: string
  name: string
  size: string
  editions: any[] | [{ name?: "", price: "", cases: [], plates: [], colors: [] | null }]
  details: string[]
  images: string[]
  layouts: string[]
  support: string[]
  handlers?: {
    handleAddEdition: any;
    handleChange: any;
    handleAddString: any;
  }
}


const initState = {
  angle: "",
  brand: "",
  connector: "",
  firmware: "",
  mount: "",
  pcb: "",
  name: "",
  size: "",
  editions: [],
  details: [""],
  layouts: [""],
  support: [""],
  market: false,
  interestCheck: true,
  groupBuy: false,
  groupBuySoon: false,
  closed: false
}

function reducer(state: any, { field, value }: any) {
  return { ...state, [field]: value }
}

const useKeyboard = () => {
  const [multipleEditions, setMultipleEditions]: SetStateAction<any> = React.useState(null)
  const [state, dispatch] = useReducer(reducer, initState)

  const handleChange = (e: any, whichArr: any, idx: number, input: string) => {
    if (whichArr) {
      dispatch(whichArr.splice(idx, 1, input))
    } else {
      dispatch({ field: e.target.name, value: e.target.value })
    }
  }

  const handlePrice = (idx: number, input: any, str: boolean) => {
    if (str) {
      dispatch(state.editions[idx].name = input)
    } else {
      dispatch(state.editions[idx].price = input)
      dispatch(state.editions[idx].suggestedPrice = input)
    }
  }


  const handleAddEdition = (e: any, multiple: boolean) => {
    e.preventDefault()
    if (state.editions.length >= 1 && !multipleEditions) {
      dispatch(state.editions.splice(0, 5))
    }
    if (!multiple) {
      dispatch(state.editions.push({ price: 0, suggestedPrice: 0, cases: [""], plates: [""], colors: [] }))
    } else if (multiple) {
      dispatch(state.editions.push({ name: "", price: 0, suggestedPrice: 0, cases: [""], plates: [""], colors: [] }))
    }
  }

  const handleAddString = (e: any, whichArr: any) => {
    e.preventDefault()
    dispatch([...whichArr, ""])
  }

  const handleDeleteString = (e: any, idx: number, whichArr: any) => {
    e.preventDefault()
    const newArr = whichArr.filter((_: any, i: number) => i !== idx)
    console.log(newArr)
    dispatch(whichArr.concat(newArr))
  }

  const handlers = {
    handleChange,
    handleAddEdition,
    handleAddString,
    setMultipleEditions,
    handleDeleteString,
    handlePrice
  }

  return [state, handlers, multipleEditions]
}

export default useKeyboard