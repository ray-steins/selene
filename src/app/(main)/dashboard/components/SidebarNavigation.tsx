'use client';

import { APP_NAVIGATION_ROUTES } from "@/configs/app.config";
import style from './dashboard-components.module.scss';
import { usePathname } from "next/navigation";
import CreateAssignmentModal from "../assignments/components/CreateAssignmentModal";
import { Class } from "@prisma/client";

function Item({
  children,
  active,
  link
}: {
  children: React.ReactNode,
  active?: boolean
  link: string
} & React.ComponentProps<'li'>) {
  return (
    <li>
      <a href={link}
        className={`
          ${style[`sidebar-wrapper__nav-list__link`]}
          ${active ? `${style['sidebar-wrapper__nav-list__link--active']}`: ''}
        `}
      >
        <div>
          <span>{ children }</span>
        </div>
      </a>
    </li>
  )
}

export default function SidebarNavigation({ userClasses }: { userClasses: Class[] }) {
  const currentPath = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  }; 

  return (
    <nav className={style['sidebar-wrapper']}>
      <div className={style['sidebar-wrapper__new-button-wrapper']}>
        <CreateAssignmentModal classes={userClasses} openMessage="New"/>
      </div>
      <ul className={style['sidebar-wrapper__nav-list']}>
        {Object.values(APP_NAVIGATION_ROUTES.dashboard).map((v, i) => {
          const activePath = Object.values(APP_NAVIGATION_ROUTES.dashboard)
            .map(v => v.path)
            .filter(p => isActive(p))
            .sort((a, b) => b.length - a.length)[0];

          return (
            <Item
              key={`${v.name}-${i}`} 
              link={v.path}
              active={v.path === activePath}
            >
              { v.name }
            </Item>
          )
        })}
      </ul>
    </nav>
  )
}