//אחרי טעינת עמוד הווב נבדוק אם המכשיר תומך בהפעלת מצלמה
//אם המכשיר תומך בהפעלת המצלמה נפעיל פונקציה אשר מפעילה את המצלמה
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("../service-worker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

//לאחר טעינת האתר נבדוק האם המכשיר תומך בהפעלת מצלמה, במידה והמכשיר תומך נקרא לפונקציה המפעילה את הוידיאו
document.addEventListener("DOMContentLoaded", function (event) {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        startVideo();
    } else {
        console.log("camera not supported");
    }

});

//פונקצייה להפעלת הוידיאו
async function startVideo() {
  
    // שמירת תג הוידאו לתוך משתנה
    const player = document.getElementById('player');
    //  הגדרת דרישות למדיה - נרצה להציג רק וידאו מהמצלמה האחורית מכיוון שמטרת התמונה היא צילום עם גור כלבים
    const constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    };
    // אם נצליח לפנות למצלמה, נזרים את הוידאו לתג הוידאו
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            player.srcObject = mediaStream;
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
}
//פונקציה להחלפת התמונה של הגור כלבים לאחר בחירת המשתמש
function changeImage(img) {
let=document.querySelector('.pupy').src=img.src;
      
     }
// צילום התמונה עם הלוגו וגור הכלבים
function doScreenshot() { 

    // נרצה לשמור על הפרופורציות של הוידאו,הלוגו וגור הכלבים
    const canvas = document.getElementById('canvas');
    imageStickerPupy = document.querySelector('.pupy');
    const imageStickerLogo = document.querySelector('.logo');

    // imageStickerPupy.width=document.querySelector('.pupy').width;
    // imageStickerPupy.height=document.querySelector('.pupy').height;


    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    // נצייר את הפריים הנוכחי על גבי הקנבס עם הלוגו וגור הכלבים
    canvas.getContext('2d').drawImage(player, 0, 0);
    // canvas.getContext('2d').drawImage(imageStickerPupy,50,170,(imageStickerPupy.width*180/100),(imageStickerPupy.height*185/100));
    canvas.getContext('2d').drawImage(imageStickerPupy,95,250,(imageStickerPupy.width*1.5),(imageStickerPupy.height*1.5));

    canvas.getContext('2d').drawImage(imageStickerLogo,-35,400,(imageStickerLogo.width*1.4),(imageStickerLogo.height*1.4));

    //נמיר את הקנבס לפורמט של תמונה 
    document.getElementById('photo')
        .src = canvas.toDataURL('image/jpeg');
    // נציג את הקנבס
    canvas.classList.remove('d-none');
};

//המרה מ-URL פונקציה להמרת לקובץ
function dataURLtoFile(dataUrl, fileName) {
    var arr = dataUrl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}

// פונקציה לשיתוף התמונה באמצעים הזמינים במכשיר
function share() {
    var fileToSend = dataURLtoFile(document.getElementById('photo').src, "ImageProg3.jpeg")
    var filesArray = [fileToSend];
    //בדיקה האם ניתן לשתף
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
            files: filesArray,
        })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
    } else {
        console.log(`Your system doesn't support sharing files.`);
    }
}




