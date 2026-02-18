export const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;

export const CALENDAR_ICON_PATH =
  'M16 2a1 1 0 0 1 1 1v1h2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 1-1Zm4 9H4v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8ZM5 6a1 1 0 0 0-1 1v2h16V7a1 1 0 0 0-1-1h-2v1a1 1 0 0 1-2 0V6H9v1a1 1 0 1 1-2 0V6H5Z';

const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'long' });
const HEADER_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const FOOTER_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const parseISODate = (value?: string) => {
  if (!value) {
    return null;
  }

  const parts = value.split('-');
  if (parts.length !== 3) {
    return null;
  }

  const [year, month, day] = parts.map(Number);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

export const getMonthGrid = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDayOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((weekDayOffset + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - weekDayOffset + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return null;
    }

    return new Date(year, month, dayNumber);
  });
};

export const formatHeaderLabel = (date: Date) => {
  const formattedDate = HEADER_DATE_FORMATTER.format(date);
  return `${formattedDate} - ${formattedDate}`;
};

export const formatFooterLabel = (date: Date) => {
  return FOOTER_DATE_FORMATTER.format(date).split('/').join(' / ');
};

export const formatMonthLabel = (date: Date) => {
  return `${MONTH_FORMATTER.format(date)} ${date.getFullYear()}`;
};
