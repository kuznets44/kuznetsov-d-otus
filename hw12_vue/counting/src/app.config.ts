import { AppConfig } from "@/interfaces";


export const appConfig: AppConfig = {
  duration: {
    default: 2,
    min: 1,
    max: 5
  },
  difficulty: {
    default: 1,
    min: 1,
    max: 10
  },
  levels: [{
    index: 1,
    digitsAmount: 1,
    elementsAmount: 2
  },
  {
    index: 2,
    digitsAmount: 1,
    elementsAmount: 3
  },
  {
    index: 3,
    digitsAmount: 1,
    elementsAmount: 4
  },
  {
    index: 4,
    digitsAmount: 2,
    elementsAmount: 2
  },
  {
    index: 5,
    digitsAmount: 2,
    elementsAmount: 3
  },
  {
    index: 6,
    digitsAmount: 2,
    elementsAmount: 4
  },
  {
    index: 7,
    digitsAmount: 3,
    elementsAmount: 2
  },
  {
    index: 8,
    digitsAmount: 3,
    elementsAmount: 3
  },
  {
    index: 9,
    digitsAmount: 3,
    elementsAmount: 4
  },
  {
    index: 10,
    digitsAmount: 4,
    elementsAmount: 3
  }],
  useSum: true,
  useMultiplication: false,
  useSubtraction: true,
  useDivision: false
}