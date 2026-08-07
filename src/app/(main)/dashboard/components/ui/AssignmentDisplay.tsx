import style from './dashboard-ui-components.module.scss';

import { fixDate } from "@/lib/utils/dateUtils";
import { DashboardItemListDisplayType } from "@/types/UI";
import { ROUTES } from '@/configs/app.config';
import TabSwitch, { TabSwitchData } from '@/components/containers/Tabswitch';
import Link from 'next/link';
import DashboardContainer from './DashboardContainer';
import { AssignmentStatusColors, AssignmentWithClass } from '@/lib/assignments';
import { capitalize } from '@/lib/utils/stringUtils';

type AssignmentListProps = {
  assignments: AssignmentWithClass[],
  title?: string,
  limit?: number,
  showStatus?: boolean
}

export type AssignmentTabData = {
  name: string,
  assignments: AssignmentWithClass[]
}

type WithTab = {
  tab: boolean
  assignmentTabs: AssignmentTabData[]
  assignments?: never
}

type WithoutTab = {
  tab?: never,
  assignmentTabs?: never,
  assignments: AssignmentWithClass[]
}

export type AssignmentDisplayProps = (WithTab | WithoutTab) & {
  limit?: number,
  displayType?: DashboardItemListDisplayType
  tab?: boolean
  title?: string
  showStatus?: boolean
}

function AssignmentListTable({
  assignments,
  limit,
  showStatus,
}: AssignmentListProps) {
  return (
    <div className={style['assignment-display-container__wrapper']}>
      {assignments.length >= 1 ? (
        <table className={style['assignment-display-container__wrapper__table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Class(es)</th>
              <th>Submission Date</th>
              { showStatus && <th>Status</th> }
            </tr>
          </thead>
          <tbody>
            {assignments.map((v, i) => {
              if (limit && limit <= i) return;

              const index = i + 1;
              const submissionDate = v.submissionDate ? fixDate(v.submissionDate) : 'Unspecified.';
              const classes = v.classes ? v.classes.map(c => `${c.name}${v.classes.length <= 1 ? '' : ', '}`) : 'Unspecified';
              const link = `${ROUTES.dashboard.assignments}/${v.slug}`;

              const Row = () => (
                <tr>
                  <td>{ index }</td>
                  <td>{ v.title }</td>
                  <td>{ classes }</td>
                  <td>{ submissionDate }</td>
                  { showStatus && 
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--unit-4px)'
                        }}
                      >
                        <div
                          style={{
                            width: '1em',
                            aspectRatio: 1,

                            backgroundColor: `${AssignmentStatusColors[v.status]}`,
                            borderRadius: '999px'
                          }}
                        />
                        <span> { capitalize(v.status) }</span>
                      </div>
                      
                    </td> 
                  }
                  <td className={style['row-link-wrapper']}>
                    <Link href={link} className={style['row-link']}/>
                  </td>
                </tr>
              )

              return (
                <Row key={`${v}-${i}`}/>
              )
            })}   
          </tbody>
        </table>
      ): (
        <div className={style['assignment-display-container__wrapper__no-assignment']}>
          <span className={style['assignment-display-container__wrapper__no-assignment__text']}>No assignments.</span>
        </div>
      )}

    </div>
  )  
}

export function AssignmentDisplay({ 
  assignments,
  tab,
  limit,
  assignmentTabs,
  showStatus,
  displayType = 'table',
  title
}: AssignmentDisplayProps) {
  const componentDisplay: Record<DashboardItemListDisplayType, React.ComponentType<AssignmentListProps>> = {
    table: AssignmentListTable
  }

  const Comp = componentDisplay[displayType];

  const DisplayComponent = ({ assignments }: AssignmentListProps) => (
    <Comp 
      assignments={assignments}
      title={title}
      limit={limit}
      showStatus={showStatus}
    />
  );

  const ComponentToDisplay = () => {
    if (tab && assignmentTabs) {
      const TabswitchData: TabSwitchData = assignmentTabs!.map(v => {
        return {
          name: v.name,
          component: <DisplayComponent assignments={v.assignments} showStatus={showStatus}/>
        }
      });

      return <TabSwitch data={TabswitchData}/>
    } else {
      return (
        <DisplayComponent 
          title={title}
          assignments={assignments!}
        />
      )
    }
  }

  return (
    <DashboardContainer title={title} className={style['assignment-display-container']}>
      <ComponentToDisplay />
    </DashboardContainer>
  )
}