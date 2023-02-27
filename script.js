
    let $ = function (id) { return document.getElementById(id) }
window.onload = () => {

    let canvas = $('canvas');
    let ctx = canvas.getContext('2d');
    let color = $('ourColor');
    let r = $('radius');
    let er = $('er-radius');
    let flag = true;
    let brushSpan = $('brush');
    let eraserSpan = $('eraser');
    let reset = $('reset');

    brushSpan.onclick = () => {
        flag = true;
        canvas.classList.remove("oneraser");
        canvas.classList.add("onbrush");
        console.log(flag);
    }

    eraserSpan.onclick = () => {
        flag = false;
        canvas.classList.remove("onbrush");
        canvas.classList.add("oneraser");
        console.log(flag);
    }

    //brush
    if (flag) {
        canvas.onmousedown = function (event) {
            canvas.onmousemove = function (event) {
                let x = event.offsetX;
                let y = event.offsetY;
                ctx.beginPath();
                ctx.arc(x - 5, y - 5, r.value, 2 * Math.PI, false)
                ctx.fillStyle = color.value;

                if (!flag) {  //erazer
                    ctx.beginPath();
                    r.value = null;
                    ctx.clearRect(x - 5, y - 5, er.value, er.value);
                }
                ctx.fill();
            }

        }
        canvas.onmouseup = function (event) {
            canvas.onmousemove = null;
        }
    }
    reset.onclick = () => {
        ctx.clearRect(0, 0, 500, 500);
    }
}

function loadImage() {
    let input;
    let file;
    let reader; 
    let img;
    let color = $('ourColor');
    let r = $('radius');
    let er = $('er-radius');
    let flag = true;
    let brushSpan = $('brush');
    let eraserSpan = $('eraser');
    let reset = $('reset');

    input = $('input_foto');

    file = input.files[0];

    reader = new FileReader();
    reader.onload = drawImage;
    reader.readAsDataURL(file);

    function drawImage() {
        img = new Image();
        img.onload = function () {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            brushSpan.onclick = () => {
                flag = true;
                canvas.classList.remove("oneraser");
                canvas.classList.add("onbrush");
                console.log(flag);
            }

            eraserSpan.onclick = () => {
                flag = false;
                canvas.classList.remove("onbrush");
                canvas.classList.add("oneraser");
                console.log(flag);
            }

            //brush
            if (flag) {
                canvas.onmousedown = function (event) {
                    canvas.onmousemove = function (event) {
                        let x = event.offsetX;
                        let y = event.offsetY;
                        ctx.beginPath();
                        ctx.arc(x - 5, y - 5, r.value, 2 * Math.PI, false)
                        ctx.fillStyle = color.value;

                        if (!flag) {  //erazer
                            ctx.beginPath();
                            r.value = null;
                            ctx.clearRect(x - 5, y - 5, er.value, er.value);
                        }
                        ctx.fill();
                    }

                }
                canvas.onmouseup = function (event) {
                    canvas.onmousemove = null;
                }
            }

            reset.onclick = () => {
                ctx.clearRect(0, 0, 500, 500);
            }
        }
        img.src = reader.result;
    }
}


