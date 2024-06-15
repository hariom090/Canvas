const canvas = document.querySelector("#canva");
const tools = document.querySelectorAll(".option"),
    slide = document.querySelector("#slider"),
    color = document.querySelectorAll(".use"),
    clear = document.querySelector(".clear-btn"),
    fillColor = document.querySelector("#fill-color"),
    colorPick = document.querySelector("#color-pick");
const ctx = canvas.getContext("2d");
// const chec = document.querySelector(".option.active")



// console.log(chec);
console.log(ctx);

let isdraw = false,
    brushwidth = 4,
    selcolor = "#000",
    mouseX, mouseY, snapshot,
    selectedTool = "brush";
   
   let wait = slide.addEventListener("change", () => {
   
        brushwidth = slide.value;
       
    });
    const drawRectangle = (e) => {
        if(fillColor.checked){
           return ctx.fillRect(e.offsetX, e.offsetY,mouseX -e.offsetX,mouseY -e.offsetY)
        }
        // ctx.beginPath();
       return ctx.strokeRect(e.offsetX, e.offsetY,mouseX -e.offsetX,mouseY -e.offsetY);
        // ctx.stroke();
    }
    const drawCircle = (e) => {
        ctx.beginPath();
        let radius = Math.sqrt(Math.pow((mouseX - e.offsetX),2)+Math.pow((mouseY -e.offsetY),2));
        if(fillColor.checked){
            // console.log(color)
           return  ctx.arc(mouseX, mouseY,radius,0*Math.PI,2*Math.PI), ctx.fill();
                           }else{
                            return ctx.arc(mouseX, mouseY,radius,0*Math.PI,2*Math.PI), ctx.stroke();
                           }
        // ctx.beginPath();
      
        // ctx.stroke();
    }
    
    const setCanvasBackground = () => {
        // setting whole canvas background to white, so the downloaded img background will be white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selcolor; // setting fillstyle back to the selectedColor, it'll be the brush color
    }
    clear.addEventListener("click",setCanvasBackground)
    window.addEventListener("load", () => {
        // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        setCanvasBackground();
    });
const startpoint = (e) => {
    isdraw = true;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushwidth;
    ctx.strokeStyle =selcolor;
    ctx.fillStyle = selcolor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
const drawTriangle = (e) => {
    ctx.beginPath(); 
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.lineTo(mouseX * 2 - e.offsetX, e.offsetY); 
    ctx.closePath(); 
    fillColor.checked ? ctx.fill() : ctx.stroke(); 
}

const drawing = (e) => {
    if (!isdraw) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "brush" || selectedTool === "erase") {
       
        ctx.strokeStyle = selectedTool === "erase" ? "#fff" : selcolor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "rectangle"){
        drawRectangle(e);

    }else if(selectedTool === "circle"){
        drawCircle(e);

    }else if(selectedTool === "triangle"){
        drawTriangle(e);
    }

}

const drawingover = () => {
    isdraw = false;
}



color.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn);
        document.querySelector(".use.in").classList.remove("in");
        btn.classList.add("in");
        selcolor = window.getComputedStyle(btn).backgroundColor;
        // console.log(selcolor);
    })


});

colorPick.addEventListener("change", () => {
    colorPick.parentElement.style.background = colorPick.value;
    colorPick.parentElement.click();
});


tools.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedTool = btn.id;
        if(selectedTool != "fill-color"){
            const txt = document.querySelector(".option.active");
        txt.classList.remove("active");
        }
        
        btn.classList.add("active");
        
    })

});

canvas.addEventListener("mousedown", startpoint);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", drawingover);


