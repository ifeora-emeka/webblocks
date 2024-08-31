import chroma from 'chroma-js';

function parseColor(color: string) {
    try {
        return chroma(color);
    } catch (error) {
        throw new Error("Invalid color format");
    }
}

export function generateColorScale(color: string): string[] {
    const baseColor = parseColor(color);

    // Generate a scale from 100 to 900
    const scale = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    const colorScale = scale.map((factor, index) => {
        // Adjust the luminance for the scale
        return baseColor.set('lch.l', baseColor.get('lch.l') * (1 - factor)).hex();
    });

    // Return the color scale in an array [100, 200, 300, ..., 900]
    return colorScale;
}

// Example usage:
// const inputColor = "#3498db"; // or "rgba(52, 152, 219, 1)"
// const colorScale = generateColorScale(inputColor);

// console.log(colorScale);
