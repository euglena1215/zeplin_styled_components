const DEBUG = false;

function layer(context, layer) {
  const style =
    layer.textStyles.length === 0 ? null : layer.textStyles[0].textStyle;

  const styles = [
    width(layer),
    height(layer),
    fontFamily(style),
    fontSize(style),
    fontWeight(style),
    fontStyle(style),
    fontStretch(style),
    lineHeight(style),
    textAlign(style),
    color(style),
    border(layer),
    borderRadius(layer),
    boxShadow(layer),
    opacity(layer),
    backgroundColor(layer)
  ].filter(Boolean);

  let language = "javascript";
  let code = `
const Component = styled.div\`
  ${styles.join("\n  ")}
\`;
`;

  if (DEBUG) {
    language = "json";
    code = JSON.stringify({ context, layer });
  }

  return {
    code,
    language
  };
}

function width(layer) {
  const width = layer.rect.width;
  return `width: ${Math.round(width)}px;`;
}

function height(layer) {
  const height = layer.rect.height;
  return `height: ${Math.round(height)}px;`;
}

function fontFamily(style) {
  if (style == null) return "";
  return `font-family: ${style.fontFamily};`;
}

function fontSize(style) {
  if (style == null) return "";
  return `font-size: ${style.fontSize}px;`;
}

function fontWeight(style) {
  if (style == null) return "";
  return `font-weight: ${style.fontWeight};`;
}

function fontStyle(style) {
  if (style == null) return "";
  return style.fontStyle === "normal" ? "" : `font-style: ${style.fontStyle};`;
}

function fontStretch(style) {
  if (style == null) return "";
  return style.fontStretch === "normal"
    ? ""
    : `font-stretch:    ${style.fontStretch};`;
}

function lineHeight(style) {
  if (style == null || style.lineHeight === undefined) return "";
  const height = style.lineHeight / style.fontSize;
  return `line-height: ${Math.round(height * 100) / 100};`;
}

function textAlign(style) {
  if (style == null) return "";
  return style.textAlign === "left" ? "" : `text-align: ${style.textAlign};`;
}

function color(style) {
  if (style == null) return "";
  return `color: ${formatColor(style.color)};`;
}

function opacity(layer) {
  return layer.opacity === 1 ? "" : `opacity: ${layer.opacity};`;
}

function border(layer) {
  return layer.borders.length === 0
    ? ""
    : `border: solid ${Math.round(layer.borders[0].thickness)}px ${formatColor(layer.borders[0].fill.color)};`;
}

function borderRadius(layer) {
  return layer.borderRadius === 0
    ? ""
    : `border-radius: ${layer.borderRadius};`;
}

function boxShadow(layer) {
  return layer.shadows.length === 0
    ? ""
    : `box-shadow: ${Math.round(layer.shadows[0].offsetX)}px ${Math.round(
        layer.shadows[0].offsetY
      )}px ${Math.round(layer.shadows[0].blurRadius)}px ${
        Math.round(layer.shadows[0].spread)
      }px ${formatColor(layer.borders[0].fill.color)};`;
}

function backgroundColor(layer) {
  return layer.fills.length === 0
    ? ""
    : `background-color: ${formatColor(layer.fills[0].color)};`;
}z

function formatColor(color) {
  const hex = color.toHex()
  return color.a === 1
    ? `#${hex.r}${hex.g}${hex.b}`
    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}
