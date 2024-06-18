const formatUrl = (url) => {
    const partToRemove = "image/upload/"; 
    const index = url.indexOf(partToRemove);
  
          
    if (index !== -1) {
      return url.slice(0, index) + url.slice(index + partToRemove.length);
    }
    return url;
  }
export {formatUrl};  