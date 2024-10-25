export const isVoidElement = (tag: string) =>
  /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
    tag,
  )