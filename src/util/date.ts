export function formattedDueDateTomorrow() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return tomorrow;
}
