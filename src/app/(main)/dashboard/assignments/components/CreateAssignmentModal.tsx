import Modal from "@/components/containers/Modal";
import { PrimaryButton } from "@/components/ui/buttons";
import ActionStateForm from "@/components/ui/forms/ActionStateForm";
import { Input } from "@/components/ui/inputs/Input";
import { assignmentPrefixGenerator } from "@/lib/prefixes";
import { sortPrefixMapArray } from "@/lib/utils/stringUtils";
import type { Class } from "@/generated/prisma/client";
import { useState } from "react";

import style from './assignment-components.module.scss';
import TextArea from "@/components/ui/inputs/textarea";

function SubmitForm(pending: boolean) {
  return (
    <>
      <PrimaryButton type='submit' disabled={pending}>Add</PrimaryButton>
    </>
  )
}

function ClassSelect({ 
  classes,
  selectedClasses,
  setSelectedClasses,
  prefixes
}: { 
  classes: Class[],
  selectedClasses: string[],
  setSelectedClasses: React.Dispatch<React.SetStateAction<string[]>> 
  prefixes: Record<string, string>
}) {
  const classLimit = classes.length;

  const addClass = () => {
    if (selectedClasses.length >= classLimit) return;

    setSelectedClasses(prev => [...prev, classes[0].slug]);
  }

  const removeClass = (index: number) => {
    if (selectedClasses.length <= 1) return;

    setSelectedClasses(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      {selectedClasses.map((v, i) => {
        const prefix = prefixes[`classes${i}`];

        return (
          <div key={`${v}-${i}`} >
            <select defaultValue={classes[0].slug} name={`${prefix}classId`}>
              {classes.map((v, i) => {
                return (
                  <option key={`${v}-${i}`} value={v.id}>{ v.name }</option>
                )
              })}
            </select>
            <button onClick={() => removeClass(i)} type='button'>X</button>            
          </div>
        )
      })}
      <button onClick={addClass} type='button'>+</button>
    </div>
  )  
}

export default function CreateAssignmentModal({ 
  classes, 
  openMessage 
}: { 
  classes: Class[], 
  openMessage?: string
}) {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([classes[0].id]);
  const prefixes = assignmentPrefixGenerator(selectedClasses.length);

  async function handleSubmit(_state: void, formData: FormData) {
    const entries = [...formData.entries()];
    const payload = sortPrefixMapArray(entries);

    const res = await fetch('/api/assignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <Modal openMessage={openMessage ?? '+'}>
      <div className={style['form-wrapper']}>
        <div className={style['form-wrapper__title-wrapper']}>
          <h1 className={style['form-wrapper__title-wrapper__title']}>Create Assignment</h1>
        </div>
        <ActionStateForm
          submitFunction={handleSubmit}
          submitSection={SubmitForm}
        >
          <fieldset>
            <legend>Main Information</legend>
            <Input
              label='Title'
              name={`${prefixes.main}title`}
            />
            <Input 
              label='Submission Date'
              name={`${prefixes.main}submissionDate`}
              type='date'
            />
            <Input 
              label='Total Score'
              name={`${prefixes.main}totalScore`}
              type='number'
            />
            <TextArea 
              label='Description'
              name={`${prefixes.main}description`}
            />
          </fieldset>
          <fieldset>
            <legend>Classes</legend>
            <ClassSelect 
              classes={classes}
              
              selectedClasses={selectedClasses}
              setSelectedClasses={setSelectedClasses}

              prefixes={prefixes}
            />
          </fieldset>
        </ActionStateForm>
      </div>
    </Modal>
  )
}