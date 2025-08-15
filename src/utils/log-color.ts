type Color = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan";

const colors: Record<Color, string> = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
};

export function styleLog(message: string, color: Color = "green") {
    console.log(`${colors[color]}%s\x1b[0m`, message);
}
