import JsBarcode from 'jsbarcode';

export const generateBarCode = (barCodeValue: string) => {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, barCodeValue);
  return canvas.toDataURL();
};
