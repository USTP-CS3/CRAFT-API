/**
 * Google api global namespace in the browser
 */
declare global {
  interface Window {
    google: any; // Add appropriate typings for gapi
  }
}


/**
 * This is a custom Google Login Button that's hidden from the user.
 * It's used to trigger the Google Login Popup.
 */
const HiddenGoogleButton = () => {
  const googleLoginWrapper = document.createElement("div");
  // Or you can simple hide it in CSS rule for custom-google-button
  googleLoginWrapper.style.display = "none";
  googleLoginWrapper.classList.add("custom-google-button");
  
  // Add the wrapper to body
  document.body.appendChild(googleLoginWrapper);
    
  // Use GSI javascript api to render the button inside our wrapper
  // You can ignore the properties because this button will not appear
  window.google.accounts.id.renderButton(googleLoginWrapper, { });

  const googleLoginWrapperButton = googleLoginWrapper.querySelector("div[role=button]");
  
  
  return {
    click: () => {
      (googleLoginWrapperButton as any)?.click();

      // Get all elements with class="custom-google-button"
      var elementsToRemove = document.querySelectorAll('.custom-google-button');

      // Iterate through the NodeList and remove each element
      for (var i = 0; i < elementsToRemove.length; i++) {
          elementsToRemove[i].remove();
      }
    }
  };
};


const GooglePopup = () => { 
  try {
    const button = HiddenGoogleButton();
    button.click();   
  }
  catch (error) { console.log(error); }
}

export { GooglePopup };