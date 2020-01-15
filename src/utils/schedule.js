import dayjs from 'dayjs';

export const scheduleByDate = (schedule) => {
    const days = schedule.reduce((days, activity) => {
        const date = activity.start.split(' ')[0];

        if (!days[date]) {
            days[date] = [];
        }

        if (activity.type !== "workshop") {
            days[date].push(activity);
        } else {
            const group = days[date].find(a => {
                return a.type === 'group' && a.start === activity.start && a.end === activity.end;
            });

            if (!group['workshops']) {
                group['workshops'] = [];
            }

            if (group['workshops'].find(x => x.id === activity.id)) {
                // don't add?
            } else {
                group['workshops'].push(activity);
            }
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