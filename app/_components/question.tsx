import classNames from "classnames"


import styles from "@/lib/styles.module.css"

export type QuestionProps = {
  readonly inView: boolean
  readonly inViewSlide: "up" | "down" | ""
  readonly outView: boolean
  readonly outViewSlide: "up" | "down" | ""
  readonly isRendered?: boolean
  children: React.ReactNode
}
export function Question({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  isRendered,
  children,
}: QuestionProps) {
  return (
    <div
      className={classNames(styles["question-box"],  {
        [styles["slide-out"]]: outView,
        [styles["slide-in"]]: inView,
        [styles["out-view__up"]]: outViewSlide === "up",
        [styles["out-view__down"]]: outViewSlide === "down",
        [styles["in-view__up"]]: inViewSlide === "up",
        [styles["in-view__down"]]: inViewSlide === "down",
        [styles["rendered"]]: isRendered,
      })}
    >
      {children}
    </div>
  )
}
