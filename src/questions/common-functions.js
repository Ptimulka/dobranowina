var CommonFunctions = {

  buttonColorFromPlatform: function(platform) {
    if(platform === "FB") {
      return "facebookblue";
    } else {
      return "red";
    }
  },
  isMobile: function() {
    var mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return mobile;
  }
}

export default CommonFunctions;
