/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export const calculateAspectRatioFit = (
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight
) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  const x = (maxWidth - srcWidth * ratio) / 2;
  const y = (maxHeight - srcHeight * ratio) / 2;

  return { width: srcWidth * ratio, height: srcHeight * ratio, x: x, y: y };
};
