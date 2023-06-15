"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/state";

export default function CountPage() {
  const count = useStore((state) => state.apples);
  const addApple = useStore((state) => state.increaseApples);

  return (
    <>
      <Button onClick={addApple}>Add C</Button>
      <div>{count}</div>
    </>
  );
}
