const $ = document.querySelector.bind(document);

function setProgressBarPercentage(percentage) {
  const backgroundSize = `${percentage}% 100%`;
  const progressBars = document.querySelectorAll('.upload .upload-files footer .list-files .file .progress');
  progressBars.forEach(progressBar => {
    progressBar.style.backgroundSize = backgroundSize;
  });
}

function startCaptcha() {
  return new Promise(function(resolve, reject) {
      grecaptcha.ready(function () {
          grecaptcha.execute('6LevqiclAAAAACiWAicy45fF4soqeKs9mCyfIWY2', { action: 'download' })
              .then(function (token) {
                  resolve(token); // Resolve with the captcha token
              }).catch(function (error) {
                  reject(error); // Reject with error if captcha execution fails
              });
      });
  });
}

function shareLink() {
  const link = document.querySelector('.lnk').getAttribute('href');
  if (navigator.share) {
      navigator.share({
          title: 'Download Link',
          text: 'Check out this file: ',
          url: link,
      })
      .then(() => showToast('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    showToast('Web Share API not supported.');
  }
}

function copyLink(event) {
  event.preventDefault();
  const link = document.querySelector('.lnk').getAttribute('href');
  navigator.clipboard.writeText(link).then(() => {
    showToast('Link copied to clipboard:', link);
  }).catch((error) => {
    showToast('Failed to copy link:', error);
  });
}

function uploadFile(file, captchaToken) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', 'pryanshutest');
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(event) {
    const percentComplete = (event.loaded / event.total) * 100;
    setProgressBarPercentage(parseInt(percentComplete.toFixed(2), 10));
  };
  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status) {
        document.getElementsByClassName("done-upload")[0].style.display = "block";
        document.getElementsByClassName("copy-upload")[0].style.display = "block";
        document.getElementsByClassName("send-upload")[0].style.display = "block";
        document.getElementsByClassName("lnk")[0].href = response.link
        if (navigator.share) {
          document.getElementsByClassName("share-upload")[0].style.display = "block";
        }
        showToast("File uploaded success");
      } else {
        document.getElementsByClassName("error-upload")[0].style.display = "block";
        showToast("Error while uploading the file 651681");
      }
    } else {
      document.getElementsByClassName("error-upload")[0].style.display = "block";
      showToast("Error while uploading the file, 214454");
    }
  };
  xhr.onerror = function() {
    document.getElementsByClassName("error-upload")[0].style.display = "block";
    // showToast("Error while uploading the file 516815");
    showToast("Error while uploading the file 516815", xhr.responseText);
  };
  xhr.open('POST', 'https://upload.zerotwo.in/upload');
  xhr.send(formData);
}

function open_send(){
  document.querySelector(".pop-send").classList.remove("hidden");
}

function close_send(){
  document.querySelector(".pop-send").classList.add("hidden");
}

function send_link(){
  showToast("This feature is not yet available");
}

let App = {};
App.init = function () {
  function handleFileSelect(evt) {
    const files = evt.target.files;
    let template = `${Object.keys(files).
      map(file => `<div class="file file--${file}">
     <div class="name"><span>${files[file].name}</span></div>
     <div class="progress active"></div>
     <div class="done done-upload" style="display: none; margin-left: 1%;">
	    <a href="" target="_blank" class="lnk" title="Open Link">
          <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
        </svg>
			</a>
     </div>

     <div class="copy-upload" style="display: none; padding-bottom: 6%">
        <a href="" target="_blank" onclick="copyLink(event)" title="Copy">
            <?xml version="1.0" ?><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path d="M16,20H8a3,3,0,0,1-3-3V7A1,1,0,0,0,3,7V17a5,5,0,0,0,5,5h8a1,1,0,0,0,0-2Zm-6-7a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2H11A1,1,0,0,0,10,13ZM21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V15a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0,0,1-1-1ZM19,15a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,.18,1H11a1,1,0,0,0,0,2h8Z" fill="#6563ff"/></svg>
        </a>
    </div>

    <div class="send-upload" style="display: none; padding-bottom: 6%">
      <a title="Send Link" onclick="open_send()">
      <svg height="16px" width="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 16 16" id="send"><g display="none"><polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="11.5 10.5 9.5 15.5 6.5 9.5 .5 6.5 15.5 .5 12.2 8.8"></polyline><polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="5.5 9 5.5 12.5 7.5 11.5"></polyline><line x1="6.5" x2="15" y1="9.5" y2="1" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></line></g><path d="M15.9,0.1C15.7,0,15.5,0,15.3,0l-15,6C0.1,6.1,0,6.3,0,6.5c0,0.2,0.1,0.4,0.3,0.5L5,9.3v3.2
      c0,0.2,0.1,0.3,0.2,0.4C5.3,13,5.4,13,5.5,13c0.1,0,0.2,0,0.2-0.1l1.6-0.8l1.8,3.6C9.1,15.9,9.3,16,9.5,16c0,0,0,0,0,0
      c0.2,0,0.4-0.1,0.4-0.3l2-5c0.1-0.3,0-0.5-0.3-0.6c-0.3-0.1-0.5,0-0.6,0.3l-1.6,4L7.1,9.6l7-7l-2.4,6c-0.1,0.3,0,0.5,0.3,0.6
      c0.3,0.1,0.5,0,0.6-0.3L16,0.7C16,0.5,16,0.3,15.9,0.1z M13.4,1.9l-7,7L1.7,6.6L13.4,1.9z M6,11.7V9.8l0.1,0.1l0.7,1.4L6,11.7z" display="none"></path><g><polygon fill="#e4f5f7" points="14.5 2.5 14.5 2 13.5 2 13.5 2.9 2.3 7.4 6.5 9.5 9.5 15.5 14.7 2.4"></polygon><polyline fill="#bfdadd" points="5.5 9 5.5 12.5 7.5 11.5"></polyline><path fill="#3e3643" d="M15.9,0.1C15.7,0,15.5,0,15.3,0l-15,6C0.1,6.1,0,6.3,0,6.5c0,0.2,0.1,0.4,0.3,0.5L5,9.3v3.2
          c0,0.2,0.1,0.3,0.2,0.4C5.3,13,5.4,13,5.5,13c0.1,0,0.2,0,0.2-0.1l1.6-0.8l1.8,3.6C9.1,15.9,9.3,16,9.5,16c0,0,0,0,0,0
          c0.2,0,0.4-0.1,0.4-0.3l2-5c0.1-0.3,0-0.5-0.3-0.6c-0.3-0.1-0.5,0-0.6,0.3l-1.6,4L7.1,9.6l7-7l-2.4,6c-0.1,0.3,0,0.5,0.3,0.6
          c0.3,0.1,0.5,0,0.6-0.3L16,0.7C16,0.5,16,0.3,15.9,0.1z M13.4,1.9l-7,7L1.7,6.6L13.4,1.9z M6,11.7V9.8l0.1,0.1l0.7,1.4L6,11.7z"></path></g></svg>
      </a>
  </div>

    <div class="short-upload" style="display: none;">
      <a href="" target="_blank" title="Short Link">
          <?xml version="1.0" ?><svg height="20px" width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><g transform="matrix(1.0607 1.0607 -1.0607 1.0607 1146.8 34.926)"><path d="m-63 1003.4v11.3 0.7 1l2 2 2-2v-1-0.7-11.3h-4z" fill="#ecf0f1"/><path d="m-61 1003.4v15l2-2v-1-0.7-11.3h-2z" fill="#bdc3c7"/><rect fill="#e67e22" height="11" width="4" x="-63" y="1004.4"/><path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h4v-1c0-1.1-0.895-2-2-2z" fill="#7f8c8d"/><g transform="translate(-7,1)"><path d="m-55.406 1016 1.406 1.4 1.406-1.4h-1.406-1.406z" fill="#34495e"/><path d="m-54 1016v1.4l1.406-1.4h-1.406z" fill="#2c3e50"/></g><path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z" fill="#95a5a6"/><rect fill="#d35400" height="11" width="2" x="-61" y="1004.4"/></g></g></svg>
      </a>
      <?xml version="1.0" ?><svg height="20px" version="1.1" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><g transform="matrix(1.0607 1.0607 -1.0607 1.0607 1146.8 34.926)"><path d="m-63 1003.4v11.3 0.7 1l2 2 2-2v-1-0.7-11.3h-4z" fill="#ecf0f1"/><path d="m-61 1003.4v15l2-2v-1-0.7-11.3h-2z" fill="#bdc3c7"/><rect fill="#e67e22" height="11" width="4" x="-63" y="1004.4"/><path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h4v-1c0-1.1-0.895-2-2-2z" fill="#7f8c8d"/><g transform="translate(-7,1)"><path d="m-55.406 1016 1.406 1.4 1.406-1.4h-1.406-1.406z" fill="#34495e"/><path d="m-54 1016v1.4l1.406-1.4h-1.406z" fill="#2c3e50"/></g><path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z" fill="#95a5a6"/><rect fill="#d35400" height="11" width="2" x="-61" y="1004.4"/></g></g></svg>
    </div>

    <div class="share-upload" style="display: none;">
        <a href="" target="_blank" onclick="shareLink()" title="Share Link">
            <?xml version="1.0" ?>
            <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
                <title/>
                <path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z"/>
            </svg>
        </a>
    </div>

    <div class="error-upload" style="display: none;">
        <a href="" target="_blank" title="Error">
            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg height="20px" style="overflow:visible;enable-background:new 0 0 32 32" viewBox="0 0 32 32" width="20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#E6E6E6;"/></g></g></g></svg>
        </a>
    </div>

    </div>`).
      join("")}`;

    $("#drop").classList.add("hidden");
    $("footer").classList.add("hasFiles");
    $(".importar").classList.add("active");
    setTimeout(() => {
      $(".list-files").innerHTML = template;
    }, 1000);

    Object.keys(files).forEach(file => {
      let load = 1000;
      setTimeout(() => {
        function startCaptchaAndUpload(fil, file) {
            startCaptcha().then(function(token) {
                uploadFile(fil, token);
                $(`.file--${file}`).querySelector(".progress").classList.remove("active");
                $(`.file--${file}`).querySelector(".done").classList.add("anim");
            }).catch(function(error) {
                console.error("Error starting captcha:", error);
                showToast("Error while getting the captcha (Reload required)");
            });
        }
        startCaptchaAndUpload(files[file], file)
      }, load);
    });
  }

  // trigger input
  $("#triggerFile").addEventListener("click", evt => {
    evt.preventDefault();
    $("input[type=file]").click();
  });

  // drop events
  $("#drop").ondragleave = evt => {
    $("#drop").classList.remove("active");
    evt.preventDefault();
  };
  $("#drop").ondragover = $("#drop").ondragenter = evt => {
    $("#drop").classList.add("active");
    evt.preventDefault();
  };
  $("#drop").ondrop = evt => {
    $("input[type=file]").files = evt.dataTransfer.files;
    $("footer").classList.add("hasFiles");
    $("#drop").classList.remove("active");
    evt.preventDefault();
  };

  //upload more
  $(".importar").addEventListener("click", () => {
    $(".list-files").innerHTML = "";
    $("footer").classList.remove("hasFiles");
    $(".importar").classList.remove("active");
    setTimeout(() => {
      $("#drop").classList.remove("hidden");
    }, 500);
  });

  // input change
  $("input[type=file]").addEventListener("change", handleFileSelect);
}();

var closediv = document.getElementsByClassName("pop-send")[0];
closediv.addEventListener("click", function(event) {
  if (event.target === closediv) {
    close_send();
  }
});
