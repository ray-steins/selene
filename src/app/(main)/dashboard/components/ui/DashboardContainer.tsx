import style from './dashboard-ui-components.module.scss';

type DashboardContainerProps = {
  title?: string
} & React.ComponentProps<'div'>

export default function DashboardContainer({
  children,
  className,
  title,
  ...props
}: DashboardContainerProps) {
  return (
    <div
      className={`${style['dashboard-container']} ${className}`}
      {...props}
    >
      <div>
        <h1 className={style['dashboard-container__title']}>{ title }</h1>
      </div>
      { children }
    </div>
  )
}

export function DashboardMinorContainer({
  children,
  className,
  title,
  ...props
}: DashboardContainerProps) {
  return (
    <div
      className={`${style['dashboard-container']} ${className}`}
      {...props}
    >
      <div>
        <h1 className={style['dashboard-container__title--minor']}>{ title }</h1>
      </div>
      { children }
    </div>
  )
}

export function DashboardPercentageContianer({
  title,
  value,
  max,
  ...props
}: {
  value: number,
  max: number
} & DashboardContainerProps) {
  const perecentage = (value / max) * 100;
  const barLength = '20vw';

  return (
    <DashboardMinorContainer
      title={title}
      {...props}
    >
      <div
        className={style['dashboard-percentage-container-wrapper']}
      >
        <span className={style['dashboard-percentage-container-wrapper__ratio']}>
          <span className={style['dashboard-percentage-container-wrapper__ratio__value']}>{value}</span>
          /{max}
        </span>
        <div className={style['dashboard-percentage-container-wrapper__progress']}>
          <div
            style={{
              width: `${barLength}`,
              height: '15px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-foreground-inverse)'
            }}
          >
            <div
              style={{
                width: `calc(${barLength} * (${ perecentage / 100 }))`,
                height: '15px',
                borderRadius: '999px',
                backgroundColor: 'var(--color-primary)',
              }}
            />
          </div>
          <span className={style['dashboard-percentage-contianer-wrapper__progress-bar__percentage']}>{ Math.round(perecentage) }%</span>
        </div>
      </div>
    </DashboardMinorContainer>
  )
}