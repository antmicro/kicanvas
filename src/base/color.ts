/*
    Copyright (c) 2022 Alethea Katherine Flowers.
    Published under the standard MIT License.
    Full text available at: https://opensource.org/licenses/MIT
*/

export class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a: number = 1,
    ) {}

    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    static get transparent_black() {
        return new Color(0, 0, 0, 0);
    }

    static get black() {
        return new Color(0, 0, 0, 1);
    }

    static get white() {
        return new Color(1, 1, 1, 1);
    }

    static from_css(str: string) {
        let r, g, b, a;

        /* Hex color */
        if (str[0] == "#") {
            str = str.slice(1);
            // #ABC -> #AABBCC
            if (str.length == 3) {
                str = `${str[0]}${str[0]}${str[1]}${str[1]}${str[2]}${str[2]}`;
            }

            // #AABBCC -> #AABBCCDD
            if (str.length == 6) {
                str = `${str}FF`;
            }

            [r, g, b, a] = [
                parseInt(str.slice(0, 2), 16) / 255,
                parseInt(str.slice(2, 4), 16) / 255,
                parseInt(str.slice(4, 6), 16) / 255,
                parseInt(str.slice(6, 8), 16) / 255,
            ];
        } else if (str.startsWith("rgb")) {
            // rgb(0, 0, 0) -> rgba(0, 0, 0, 1);
            if (!str.startsWith("rgba")) {
                str = `rgba(${str.slice(4, -1)}, 1)`;
            }
            str = str.trim().slice(5, -1);

            const parts = str.split(",");

            if (parts.length != 4) {
                throw new Error(`Invalid color ${str}`);
            }

            [r, g, b, a] = [
                parseFloat(parts[0]!) / 255,
                parseFloat(parts[1]!) / 255,
                parseFloat(parts[2]!) / 255,
                parseFloat(parts[3]!),
            ];
        } else {
            throw new Error(`Unable to parse CSS color string ${str}`);
        }

        return new Color(r, g, b, a);
    }

    to_css(): string {
        return `rgba(${this.r_255}, ${this.g_255}, ${this.b_255}, ${this.a})`;
    }

    to_array(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }

    get r_255() {
        return Math.round(this.r * 255);
    }

    set r_255(v) {
        this.r = v / 255;
    }

    get g_255(): number {
        return Math.round(this.g * 255);
    }

    set g_255(v) {
        this.g = v / 255;
    }

    get b_255(): number {
        return Math.round(this.b * 255);
    }

    set b_255(v) {
        this.b = v / 255;
    }

    get is_transparent_black() {
        return this.r == 0 && this.g == 0 && this.b == 0 && this.a == 0;
    }

    with_alpha(a: number) {
        const c = this.copy();
        c.a = a;
        return c;
    }
}
