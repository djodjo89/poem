import randomColor from 'randomcolor';
import Color from 'color';

export class ColorGenerator {
  private _colors: string[];
  private exclude: string[];
  private HUES: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
  ];

  constructor(exclude: string[]) {
    this._colors = Array(3).fill('');
    this.exclude = exclude;
  }

  generateColors(): void {
    let baseColor: string = this.HUES[Math.floor(Math.random() * this.HUES.length)];
    const colorIsInCorrect = (baseColor: string, color2: string, color3: string, color4: string) =>
      baseColor === '' ||
      color2 === '' ||
      color3 === '' ||
      color4 === '' ||
      this.exclude.includes(baseColor) ||
      this.exclude.includes(color2) ||
      this.exclude.includes(color3) ||
      this.exclude.includes(color4) ||
      Color(baseColor).isLight(); // ||
      //Color(color).luminosity() < 0.5 ||
      // this._colors[1] !== '#ffffff';

    let color2: string = '';
    let color3: string = '';
    let color4: string = '';

    while (colorIsInCorrect(baseColor, color2, color3, color4)) {
      baseColor = randomColor({
        hue: baseColor,
      });
      color2 = Color(baseColor).lighten(0.1);
      color3 = Color(baseColor).lighten(0.2);
      color4 = Color(baseColor).lighten(0.3);
    }

    this._colors[0] = color2;
    this._colors[1] = color3;
    this._colors[2] = color4;
  }

  get colors(): string[] {
    return this._colors;
  }
}
