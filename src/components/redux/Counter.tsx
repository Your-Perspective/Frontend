"use client";

import React, { useState } from "react";

import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export function Counter() {
  // using redux
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  // 2 of these functions must used in order to work properly with redux;

  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className="flex gap-10 justify-center items-center my-5">
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          className="text-center"
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
