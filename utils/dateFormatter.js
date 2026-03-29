function formatDate(dateParam) {
  const date = new Date(dateParam);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short"
  };

  const formatter = Intl.DateTimeFormat("en-us", options);

  return formatter.format(date);
}

export { formatDate }