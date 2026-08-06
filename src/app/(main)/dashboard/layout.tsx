import style from './components/dashboard-components.module.scss'
import SidebarNavigation from "./components/SidebarNavigation";
import MainContentsWrapper from "./components/MainContentsWrapper";
import { getCurrentUserFromServer, getUserClasses } from '@/data/user';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUserFromServer();
    
  const classes = await getUserClasses(currentUser!.id);
  if (!classes) redirect('/classes');

  return (
    <div className={style['dashboard-wrapper']}>
      <header
        style={{
          width: '100%',
          height: '50px',
          borderRightColor: 'var(--color-border)'
        }}
      />
      <section className={style['main-dashboard-contents-wrapper']} >
        <SidebarNavigation userClasses={classes}/>
        <MainContentsWrapper>
          { children }
        </MainContentsWrapper>
      </section>
    </div>
  )
}