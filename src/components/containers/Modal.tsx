'use client';

import { useState } from "react";
import Portal from "./Portal";

export default function Modal({
  children,
  openMessage
}: {
  children: React.ReactNode,
  openMessage: string
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal &&
        <Portal>
          <div>
            <button onClick={() => setShowModal(false)} type='button'>X</button>
            { children }
          </div>
        </Portal>
      }
      <button onClick={() => setShowModal(true)} type='button'>{ openMessage }</button>
    </div>
  )
}