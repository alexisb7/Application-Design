export function parseUrl() {
    let url = window.location;
    let query = url.href.split("?")[1] || "";
    let delimiter = "&";
    let result = {};
  
    let parts = query.split(delimiter);
  
    return parts
      .map((item) => item.split("="))
      .reduce((result, kv) => 
      {
        result [kv[0]]=kv[1];
        return result;
      }, result);
  }