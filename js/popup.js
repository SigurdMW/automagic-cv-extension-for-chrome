function renderStatus(statusText) {
  document.getElementById('status').innerHTML = statusText;
}

function changeButtonText(){
  // change text in button
  var btn = document.getElementById("activate-extension");
  if (btn.innerHTML === "Slå på") {
    btn.innerHTML = "Slå av"; 
  } else {
    btn.innerHTML = "Slå på";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var statusOn = 'CV automagi er <span class="status on">på</span>',
      statusOff = 'CV automagi er <span class="status off">av</span>';
  
  // initial status
  renderStatus(statusOff);
  
  document.getElementById("activate-extension").addEventListener("click", function(){
    (document.getElementById("status").innerHTML === statusOn) ? renderStatus(statusOff) : renderStatus(statusOn);
    chrome.tabs.executeScript(null,
      {file:"js/app.js"}
    );

    chrome.tabs.insertCSS(null,
        {file:"css/style.css"}
    );
    changeButtonText();
  });
});

//
// ---   TO DO   ---
//
// when activated, find all inputs and textareas on the page
// invent some magic UI to be placed next to the input fields:
// find the position of the input in the document, place the magic UI element there by absolute positioning (z-index needs to be MAX)
// glue the inputs and the UI together with som data attribute or something
// Categories: About me, Experience, Education .... 
// set the corresponding value of the input to what the user selected

// make elements movable (drag n drop)
/*"content_scripts": [
    {
      "matches": ["<all_urls>"],
      "css": ["css/style.css"],
      "js": ["js/app.js"]
    }
  ],
  */