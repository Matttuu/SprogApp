function createCookie(name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";";
  
    if (expires) {
      // If it's a date
      if(expires instanceof Date) {
        // If it isn't a valid date
        if (isNaN(expires.getTime()))
         expires = new Date();
      }
      else
        expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
  
      cookie += "expires=" + expires.toGMTString() + ";";
    }
  
    if (path)
      cookie += "path=" + path + ";";
    if (domain)
      cookie += "domain=" + domain + ";";
  
    document.cookie = cookie;
  }
  



 // Denne kode bruges til at oprette en cookie (Skal ligge på en anden side evt. login)
  createCookie("website", "exino.it", new Date(new Date().getTime() + 10000));
createCookie("author", "aurelio", 30);


// Denne kode henter cookies
function getCookie(name) {
    var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
  }


// Denne kode bruges til at slette 
function deleteCookie(name, path, domain) {
    // If the cookie exists
    if (getCookie(name))
      createCookie(name, "", -1, path, domain);
  }



