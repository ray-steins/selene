'use client';

import { useState } from "react";
import Portal from "./Portal";
import { BlankButton, PrimaryButton } from '../ui/buttons/index';

import style from './container.module.scss';

export default function Modal({
  children,
  openMessage
}: {
  children: React.ReactNode,
  openMessage: string
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal &&
        <Portal>
          <div className={style['modal-wrapper']}>
            <div className={style['modal-wrapper__main-container']}>
              <BlankButton onClick={() => setShowModal(false)} type='button'>X</BlankButton>
              <div className={style['modal-wrapper__main-container__contents']}>
                { children }
              </div>
            </div>
          </div>
        </Portal>
      }
      <PrimaryButton onClick={() => setShowModal(true)} type='button'>{ openMessage }</PrimaryButton>
    </>
  )
}