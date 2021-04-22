export interface Level {
  index: number,
  digitsAmount: number,
  elementsAmount: number
}

export interface Range {
  default: number,
  min: number,
  max: number
}

export interface AppConfig {
  duration: Range,
  difficulty: Range,
  levels: Level[],
  useSum: boolean,
  useSubtraction: boolean,
  useMultiplication: boolean,
  useDivision: boolean
}

export interface ResultItem {
  expression: string[],
  correctAnwser: number,
  userAnswer: number
}

export interface Result {
  date?: string,
  difficulty: number,
  duration: number,
  results: ResultItem[]
}