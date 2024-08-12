import JsBarcode from 'jsbarcode';

export const generateBarCode = (barCodeValue: string) => {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, barCodeValue, {
    height: 400,
    width: 10,
    fontSize: 50
  });
  return canvas.toDataURL();
};
