import { CSSProperties, useState } from 'react';

export function useHoverPress(style?: string) {
  const [hovered, setHover] = useState(false);
  const [pressed, setPress] = useState(false);

  const [buttonStyle, setButtonStyle] = useState<CSSProperties>();

  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false)
      setPress(false)
    },
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget.style;
      const snapshot: Record<string, string> = {};

      for (let i = 0; i < el.length; i++) {
        const prop = el[i];
        snapshot[prop] = el.getPropertyValue(prop);
      }
      setButtonStyle(snapshot as CSSProperties);

      setPress(true)
      setHover(false)
    },
    onMouseUp: () => {
      setPress(false);
    }
  }
  const customPressedStyle = pressed ? style : buttonStyle

  const pressedStyle = style ? customPressedStyle : {
    opacity: pressed ? 'var(--opacity-mute-partial)' : 1,
  }

  return { hovered, pressed, eventHandlers, style: pressedStyle }
}