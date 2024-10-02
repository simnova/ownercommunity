
/**
* @param sortOrder 1 for ascending, -1 for descending
*/
export const sortDateArray = (arr: Date[], sortOrder: 1|-1) => {
  return arr.sort((a: Date, b: Date) => {
      return ((a.getTime() || 0)- (b.getTime() || 0)) * sortOrder;
  });
};