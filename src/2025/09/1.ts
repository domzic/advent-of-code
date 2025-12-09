export default async function (input: string) {
    const points = input.split('\n').map((l) => l.split(',').map(Number));

    let maxArea = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const width = Math.abs(points[i][0] - points[j][0]) + 1;
            const height = Math.abs(points[i][1] - points[j][1]) + 1;
            const area = width * height;
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    console.log({ maxArea });
}
