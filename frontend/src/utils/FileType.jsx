// get the file icon based on the file name extension
function getFileType(filename) {
  const fileExtension = filename.split('.').pop().toLowerCase();
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'webp':
      return 'image';
    case 'pdf':
      return 'pdf';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'audio';
    case 'txt':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
    case 'json':
    case 'xml':
    case 'csv':
      return 'document';
    default:
      return 'unknown';
  }
}
export default getFileType;
