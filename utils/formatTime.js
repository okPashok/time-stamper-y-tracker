export function formatHoursToTimeString(hours) {
    const fullHours = Math.floor(hours);
    const minutes = Math.round((hours - fullHours) * 60);

    let result = '';
    if (fullHours > 0) result += `${fullHours}h`;
    if (minutes > 0) result += `${minutes}m`;

    return result || '0h';
}
