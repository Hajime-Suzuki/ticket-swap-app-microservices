export const formatCurrency = (num: string | number) => {
  return new Intl.NumberFormat('nl-NL').format(+num)
}
