export class ColorGenerator {
  private _colors: string[];
  private exclude: string[];

  constructor(nbColors: number, exclude: string[]) {
    this._colors = Array(nbColors).fill('');
    this.exclude = exclude;
  }

  generateColors(): void {
    const x: string = '#'+Math.floor(Math.random()*16777215).toString(16);
    this._colors = this._colors.map(this.generateColor)
  }

  private generateColor = (): string => {
    let color: string = this.randomColor();

    while (this.colors.concat(this.exclude).includes(color)) {
      color = this.randomColor();
    }

    return color;
  };

  private randomColor(): string {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  get colors(): string[] {
    return this._colors;
  }
}
