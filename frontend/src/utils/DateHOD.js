/**
 * Returns a formatted time string in the format "hh:mm am/pm"
 * @param {Date} date - The date object to extract the time from
 * @returns {string} - The formatted time string
 */
function hourOfDay(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}

export default hourOfDay;
