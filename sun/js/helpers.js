function getTime(hour, day, month) {
  const changedTime = new Date();
  const minutes = Math.ceil((hour % 2) * 60);
  changedTime.setMinutes(minutes);
  changedTime.setHours(Math.floor(hour));
  changedTime.setMonth(Math.floor(month) - 1);
  changedTime.setDate(Math.floor(day));

  return changedTime;
}

export { getTime };
