export const getFormattedDate = (isoDate: string) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(isoDate));
};
