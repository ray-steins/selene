'use client'

import { neutralizeString } from "@/lib/utils/stringUtils";
import { CSSProperties, useState } from "react"
import { BlankButton } from "../ui/buttons";

import style from './container.module.scss'

export type TabSwitchData = {
  name: string,
  component: React.ReactNode,
  preload?: boolean
}[]

export default function TabSwitch({
  data
}: {
  data: TabSwitchData
}) {
  const preloaded = [] as number[];
  data.map((v, i) => {
    if (v.preload) {
      preloaded.push(i);
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [visted, setVisited] = useState<Set<number>>(new Set([0, ...preloaded]));
  
  const switchDiv = (i: number) => {
    setActiveIndex(i);
    setVisited(prev => new Set(prev).add(i))
  }

  return (
    <>
      <div>
        {data.map((v, i) => (
          <BlankButton
            key={neutralizeString(v.name)}
            onClick={() => switchDiv(i)}
            aria-selected={i === activeIndex}

            className={style['tab-switch-button']}

            type='button'
          >
            { v.name }
          </BlankButton>
        ))}
      </div>
      <>
        {data.map((v, i) => (
          visted.has(i) &&
          <div
            key={neutralizeString(v.name)}
            className={style['tab-switch-component-contianer']}
            hidden={i !== activeIndex}
          >
            { v.component }
          </div>
        ))}
      </>
    </>
  )
}