import style from './dashboard-components.module.scss';

export default function MainContentsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className={style['main-contents-container']}>
      <div className={style['main-contents-wrapper']}>
        { children }
      </div>
    </main>
  )
}