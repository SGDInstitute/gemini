import dayjs from 'dayjs';

export const scheduleByDate = (schedule, includeWorkshops = false) => {
    const days = schedule.reduce((days, activity) => {
        const date = activity.start.split(' ')[0];

        if (!days[date]) {
            days[date] = [];
        }

        if (!includeWorkshops) {
            if (activity.type !== "workshop") {
                days[date].push(activity);
            }
        } else {
            days[date].push(activity);
        }

        return days;
    }, {});

    const sectionList = Object.keys(days).map((date) => {
        return {
            date,
            dayOfWeek: dayjs(date).format('dddd'),
            data: days[date]
        };
    });

    return sectionList
}