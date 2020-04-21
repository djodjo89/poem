export interface PostitModel {
  id: number,
  key: number,
  x: number,
  y: number,
  poemPlaceholder: string,
  titlePlaceholder: string,
  askConfirmation: (id: number) => void,
  colors: string[],
  toFirstPlan: (id: number) => void,
  firstPlan: boolean,
  title: string,
  text: string,
}
