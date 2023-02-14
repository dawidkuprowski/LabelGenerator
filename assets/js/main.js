function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

const qrSize = 300;

class Label {
    constructor (anc, bin, quant) {
        this.anc = anc;
        this.bin = bin;
        this.quant = quant;

        this.id = new Date().getTime();
        this.date = new Date();
        this.formatedDateAndTime = `${this.date.toLocaleDateString()} | ${this.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

        this.init();
    }

    init () {
        document.getElementById('labels').innerHTML += `
        <div id="${this.id}" class="label_container">
            <span class="date">${document.getElementById('checkbox_date').checked ? this.formatedDateAndTime : ''}</span>
            <div class="row logo">
                <img src="assets/img/Elux_Logo.png" height="6vw" />
            </div>
            <div class="space_h"></div>
            <div class="row">
                <div class="col qrcode">
                    <span class="qrTitle">ANC</span>
                    <span class="qrValue">${this.anc}</span>
                    <div id="qrANC_${this.id}" class="qr"></div>
                </div>
                <div class="space_v"></div>
                <div class="col qrcode">
                    <span class="qrTitle">BIN</span>
                    <span class="qrValue">${this.bin}</span>
                    <div id="qrBIN_${this.id}" class="qr"></div>
                </div>
            </div>
            <div class="space_h"></div>
            <div class="row">
                <div class="col qrcode">
                    <span class="qrTitle">QUANTITY</span>
                    <span class="qrValue">${this.quant}</span>
                    <div id="qrQUANT_${this.id}" class="qr"></div>
                </div>
            </div>
        </div>
        `;

        var qrANC = new QRCode(document.getElementById("qrANC_" + this.id), {
            width: qrSize,
            height: qrSize,
            text: this.anc
        });

        var qrBIN = new QRCode(document.getElementById("qrBIN_" + this.id), {
            width: qrSize,
            height: qrSize,
            text: this.bin
        });

        var qrQUANT = new QRCode(document.getElementById("qrQUANT_" + this.id), {
            width: qrSize,
            height: qrSize,
            text: this.quant
        });

        document.getElementById('labels_preview').innerHTML += `
            <div id="label_preview_${this.id}" class="label_preview bg-white">
                <div class="col">
                    <span class="title">ANC</span>
                    <span class="value">${this.anc}</span>
                </div>
                <div class="col">
                    <span class="title">BIN</span>
                    <span class="value">${this.bin}</span>
                </div>
                <div class="col">
                    <span class="title">QUANTITY</span>
                    <span class="value">${this.quant}</span>
                </div>
                <input type="submit" class="bg-red" onclick="removeLabel(${this.id});" value="Delete"></input>
            </div>
        `;
    }
}

function addLabel () {
    createLabel(document.getElementById('input_anc').value, document.getElementById('input_bin').value, document.getElementById('input_quant').value);
    if (document.getElementById('checkbox_clear').checked) {
        document.getElementById('input_anc').value = '';
        document.getElementById('input_bin').value = '';
        document.getElementById('input_quant').value = '';
    }
}

function createLabel (anc, bin, quant) {
    new Label(anc, bin, quant);
}

function removeLabel (id) {
    document.getElementById('label_preview_' + id).remove();
    document.getElementById(id).remove();
}

function print () {
    var mywindow = window.open('', 'PRINT', 'height=1280,width=720');

    mywindow.document.write(`
        <html>
            <head>
                <title>OnFloor Label</title>
                <link rel="stylesheet" href="assets/css/label.css">
            </head>
            <body>`);
    
    const childs = document.getElementById('labels').children;
    for (const child of childs) {
        mywindow.document.write(`<div class="label_container">`);
        mywindow.document.write(child.innerHTML);
        mywindow.document.write(`</div>`);
    }

    mywindow.document.write(`
            </body>
        </html>
    `);
}