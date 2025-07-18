let prompt=document.querySelector("#prompt")
let submitbtn=document.querySelector("#submit")
let chatcontainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#image")
let image=document.querySelector("#image img")
let imageinput=document.querySelector("#image input")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyArHNgT65ivTdYvrQfnj3k1tZVa9HYSPUQ"
let user={
    message:null,
    file:{
        mime_type: null,
        data: null
    }
}

async function generateResponse(aiChatBox) {
    let text=aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [{
        "parts":[{"text": user.message},(user.file.data?
            [{"inline_data":user.file}]:[])]
        }]
        })
    }
    try{
        let response = await fetch(Api_Url,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")          
        .replace(/\*(.*?)\*/g, "<i>$1</i>")               
        .replace(/(?:\r\n|\r|\n)/g, "<br>")               
        .split('\n')
        .filter(p => p.trim())
        .map(p => `<p>${p.trim()}</p>`)
        .join('')
        .trim()
        text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error);
        text.innerHTML = "Oops! Something went wrong. Please try again.";
    }
    finally{
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
        image.src=`img.svg`
        image.classList.remove("choose")
        user.file={}
    }
}

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatResponse(userMessage){
    user.message=userMessage
    if (!userMessage.trim()) return;
    let html=`<div class="user-chat-area">
                ${user.message}
                ${user.file.data?`<img src="data:${user.file.mime_type}
                    ;base64,${user.file.data}" class="chooseimg" />`:""}
            </div>
            <img src="userimage.png" alt="user image" id="userimage" width="8%">`
            prompt.value=""
            let userChatBox=createChatBox(html,"user-chat-box")
            chatcontainer.appendChild(userChatBox)
            chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
            setTimeout(()=>{
                let html=`<img src="aiimage.png" alt="ai iamge" id="aiimage" width="10%">
            <div class="ai-chat-area">
                 <img src="load.gif" alt="loading image" class="load" width="50px">
            </div>`
            let aiChatBox=createChatBox(html,"ai-chat-box")
            chatcontainer.appendChild(aiChatBox)
            generateResponse(aiChatBox)
            },600)
            
}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
    }
})

submitbtn.addEventListener("click",()=>{
    handlechatResponse(prompt.value)
})

imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0]
    if(!file)return
    let reader=new FileReader()
    reader.onload=(e)=>{
        let base64string=e.target.result.split(",")[1]
        user.file={
            mime_type: file.type,
            data: base64string
        }
        image.src=`data:${user.file.mime_type};base64,${user.file.data}`
        image.classList.add("choose")
    }
    reader.readAsDataURL(file)
})

imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})


  const slides = document.querySelectorAll('.carousel-image');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000); // changes every 4 seconds


  const playlist = []

  // Add event listener to all buttons
  document.querySelectorAll('.add-to-playlist-btn').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.music-card')
      const title = card.getAttribute('data-title')
      const src = card.getAttribute('data-src')

      // Check if already in playlist
      const exists = playlist.some(song => song.src === src)
      if (!exists) {
        playlist.push({ title, src })
        updatePlaylistUI()
      } else {
        alert("Already in playlist!")
      }
    })
  })

  function updatePlaylistUI() {
    const playlistContainer = document.getElementById("my-playlist")
    playlistContainer.innerHTML = ""; // Clear existing

    playlist.forEach(song => {
      const div = document.createElement("div")
      div.className = "playlist-item"
      div.innerHTML = `
        <p>${song.title}</p>
        <audio controls>
          <source src="${song.src}" type="audio/mp3">
        </audio>
      `
      playlistContainer.appendChild(div);
    })
  }

  const buttons = document.querySelectorAll(".add-to-playlist-btn");
  const toast = document.getElementById("playlist-toast");
  
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      toast.classList.add("show");
  
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000); // disappears after 2 seconds
    });
  });

  const englishBtn = document.getElementById("englishBtn");
  const hindiBtn = document.getElementById("hindiBtn");

  const englishSection = document.getElementById("english-meditation");
  const hindiSection = document.getElementById("hindi-meditation");

  englishBtn.addEventListener("click", () => {
    englishSection.style.display = "block";
    hindiSection.style.display = "none";
  });

  hindiBtn.addEventListener("click", () => {
    hindiSection.style.display = "block";
    englishSection.style.display = "none";
  });
