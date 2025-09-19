import { VND_CURRENCY_UNIT } from '@/constants/common.const'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import multiply from 'lodash/multiply'
import sum from 'lodash/sum'

export const toFixedNumber = (value: number, fractionDigits = 2) => {
  if (isNil(value)) return undefined

  return Number(value.toFixed(fractionDigits))
}

export const sumWithFixed = (params: number[]) => {
  return toFixedNumber(sum(params), 4)
}

export const exchangeCurrencyWithFixed = (money: number, exchangeRate: number) => {
  return toFixedNumber(multiply(exchangeRate, money), 0)
}

export const multiplyWithFixed = (a: number, b: number) => {
  return toFixedNumber(multiply(a, b))
}

export const dividedWithFixed = (a: number, b: number) => {
  return toFixedNumber(a / b)
}

export const toFixedByCurrency = (value: number, currencyCode: string) => {
  return toFixedNumber(value, isEqual(currencyCode, VND_CURRENCY_UNIT) ? 0 : undefined)
}
