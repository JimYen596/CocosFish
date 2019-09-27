export function getDegreeByDirection(direction): number {
    return Math.atan2(direction.y, direction.x) * 180 / Math.PI;
}
