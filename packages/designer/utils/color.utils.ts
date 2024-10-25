import chroma from "chroma-js";

function parseColor(color: string) {
  try {
    return chroma(color);
  } catch (error) {
    throw new Error("Invalid color format");
  }
}

// export function generateColorScale(color: string): string[] {
//     const baseColor = parseColor(color);

//     const scale = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
//     const colorScale = scale.map((factor, index) => {
//         return baseColor.set('lch.l', baseColor.get('lch.l') * (1 - factor)).hex();
//     });

//     return colorScale;
// }

export function generateColorScale(
  baseColor: string,
  steps: number = 5,
): string[] {
  return chroma
    .scale([
      chroma(baseColor).brighten(2),
      baseColor,
      chroma(baseColor).darken(2),
      chroma(baseColor).darken(4),
    ])
    .mode("lab")
    .colors(steps);
}
