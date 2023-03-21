/**
 * parses a iso string object and compares it to current date
 * returns difference of date as string value in different formats
 * @param {ISO String data} dateString 
 * @returns string vals Today,Yesterday,2D-6D, MM/DD/YYYY
 */
function parseDate (dateString) {
    const now = new Date();
    const date = new Date(dateString);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }
    
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays > 1 && diffInDays < 7) {
      return `${diffInDays}D`;
    } else {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
}

export default parseDate;