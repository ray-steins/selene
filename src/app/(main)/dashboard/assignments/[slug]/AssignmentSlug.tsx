'use client';

import { AssignmentComplete } from "@/data/assignments";
import { fixDate } from "@/lib/utils/dateUtils";
import { notFound } from "next/navigation";

import style from './assignment-info.module.scss';
import { GhostButton, PrimaryButton } from "@/components/ui/buttons";
import { startTransition, useContext, useOptimistic, useState } from "react";
import { markCompleteAssignmentForUser, unmarkCompleteAssignmentForUser } from "@/actions/user";
import { UserContext } from "@/contexts/UserContex";

function MarkCompleteButton({
  slug,
  isCompleted,
  setIsCompleted
}: {
  slug: string,
  isCompleted: boolean,
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const user = useContext(UserContext);
  const currentUser = user?.user

  const [optimisticMark, applyOptimisticMark] = useOptimistic(isCompleted,
    (state, action: 'mark' | 'unmark') => {
      if (action === 'mark') return true;
      if (action === 'unmark') return false;

      return state;
    }
  );

  function markComplete() {
    startTransition(async () => {
      applyOptimisticMark('mark');
      try {
        markCompleteAssignmentForUser(currentUser?.id!, slug);

        setIsCompleted(true);
      } catch (error) {
        alert('Failed to mark assignment as complete') 
      }
    });
  }
  function unmarkComplete() {
    startTransition(async () => {
      applyOptimisticMark('unmark');
      try {
        unmarkCompleteAssignmentForUser(currentUser?.id!, slug);

        setIsCompleted(false);
      } catch (error) {
        alert('Failed to unmark assignment')
      }
    });
  }

  return optimisticMark ? (
    <GhostButton onClick={unmarkComplete} >Mark as Uncompleted</GhostButton>
  ) : (
    <PrimaryButton onClick={markComplete}>Mark as Completed</PrimaryButton>
  )
}

export default function AssignmentSlugClient({ data }: { data: AssignmentComplete }) {
  if (!data) notFound();
  
  const [completed, setCompleted] = useState(data.status === 'completed');

  const submissionDate = data.submissionDate ? fixDate(data.submissionDate) : 'Unspecified.';
  const classes = data.classes ? data.classes.map(c => `${c.name}${data.classes.length <= 1 ? '' : ', '}`) : 'Unspecified';

  return (
    <div className={style['assignment-info-wrapper']}>
      <div className={style['assignment-info-wrapper__info-container']}>
        <div className={style['assignment-info-wrapper__info-container__title']}>
          <div className={style['assignment-info-wrapper__info-container__title__main']}>
            <span className={style['title']}>{ data.title }</span>
            <span className={style['minor-1']}>{ classes }</span>
          </div>
          <span className={style['minor-2']}>To be submitted on <i>{ submissionDate }</i></span>
        </div>
      </div>
      <div>
        <MarkCompleteButton 
          slug={data.slug}
          isCompleted={completed}
          setIsCompleted={setCompleted}
        />
      </div>
    </div>
  )
} 