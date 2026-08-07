'use client'
import { createClass, deleteClass, updateClassName } from "@/actions/class";
import { ClassType } from "./page";
import { useContext, useRef } from "react";
import { UserContext } from "@/contexts/UserContex";

import { useState, useOptimistic, startTransition } from "react";
import { ROUTES } from "@/configs/app.config";
import { PrimaryButton } from "@/components/ui/buttons";

import style from './dashboard-classes.module.scss';
import { removeUserFromClass } from "@/actions/user";

function ClassCard({
  data,
  onRename,
  link
}: {
  data: ClassType
  onRename: (slug: string, name: string) => void
  link: string
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.name);
  const inputRef = useRef<HTMLInputElement>(null);

  function commit() {
    setEditing(false);
    if (value.trim() && value !== data.name) {
      onRename(data.slug, value.trim());
    } else {
      setValue(data.name);
    }
  }

  return (
    <div className={style['class-card-container']}>
      <a href={link} className={style['class-card-container__wrapper-link']}>
        <div
          className={style['class-card-container__wrapper-link__box']}
        />      
      </a>
      <div className={style['class-card-container__class-name-wrapper']}>
        {editing ? (
          <input 
            className={`${style['class-card-container__class-name-wrapper__input']} ${style['class-name-edit']}`}
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              console.log(data.name, 'blurred');
              commit();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') {
                setValue(data.name);
                setEditing(false);
              }
            }}        
          />
        ): (
          <span 
            onDoubleClick={() => setEditing(true)}

            className={`${style['class-card-container__class-name-wrapper__name']} ${style['class-name-edit']}`}
          >
            { data.name}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ClassesPageClient({
  classList
}: {
  classList: ClassType[]
}) {
  const user = useContext(UserContext);
  const currentUser = user?.user;

  const [classes, setClasses] = useState(classList);
  const [optimisticClass, applyOptimistic] = useOptimistic(classes,
    (state, action:
      | { type: 'add', class: ClassType }
      | { type: 'resolve', slug: string, class: ClassType }
      | { type: 'rename', slug: string, name: string }
      | { type: 'remove', slug: string }
    ) => {
      if (action.type === 'add') return [...state, action.class];
      if (action.type === 'rename')
        return state.map((i) => (i.slug === action.slug ? { ...i, name: action.name } : i));
      if (action.type === 'remove')
        return state.filter(c => c.slug !== action.slug);
      return state;
    } 
  )

  function addClass() {
    const tempClass: ClassType = { slug: `new-class-${optimisticClass.length}`, name: `New Class ${optimisticClass.length}` }

    startTransition(async () => {
      applyOptimistic({ type: 'add', class: tempClass });
      try {
        const r = await createClass(undefined, currentUser?.id);
        setClasses(prev => [...prev, { name: r.name, slug: r.slug }]);
      } catch (error) {
        alert('Failed to create class instance')
      }
    })
  }

  function removeClass(slug: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'remove', slug });
      try {
        await removeUserFromClass(currentUser?.id!, slug);
        setClasses(prev => prev.filter(c => c.slug !== slug))
      } catch (error) {
        alert(`Failed to remove class ${slug}`)
      }
    })
  }

  function handleRename(slug: string, name: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'rename', slug, name });
      await updateClassName(slug, name);
      setClasses((prev) => prev.map((v) => (v.slug === slug ? { ...v, name } : v)));
    });
  }  

  return (
    <div>
      <PrimaryButton type='button' onClick={addClass}>Add Class</PrimaryButton>
      <div className={style['classes-container']}>
        {optimisticClass.map((v, i) => {
          const link = `${ROUTES.dashboard.classes}/${v.slug}`;

          return (
            <div key={`${v}-${i}`} className={style['classes-container__class-wrapper']}>
              <ClassCard data={v} onRename={handleRename} link={link} />
              <button type='button' onClick={() => removeClass(v.slug)}>Remove</button>              
            </div>
          )
        })}
      </div>
    </div>
  )
}