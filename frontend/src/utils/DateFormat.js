/**
 * Returns a formatted date string in the format "Mar 17, 2023, 6:28 PM"
 * @param {string} dateString - The date string to format (in ISO format)
 * @returns {string} - The formatted date string
 */
function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);
  
  // Define options for formatting the date string
  const options = { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true 
  };
  
  // Use the toLocaleDateString method to format the date string
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Return the formatted date string
  return formattedDate;
}

export default formatDate;