export const formatDateTime = (date: string): string => new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'medium',
}).format(new Date(date));
