
var DeltaE = (function () {
    function DeltaE(lb, la) {
        this.lb = new Array(3);
        this.la = new Array(3);
        this.lb[0] = lb[0];
        this.lb[1] = lb[1];
        this.lb[2] = lb[2];
        this.la[0] = la[0];
        this.la[1] = la[1];
        this.la[2] = la[2];
    }
    DeltaE.prototype.getDeltaE = function () {
        var x2 = this.lb[0] - this.la[0];
        var y2 = this.lb[1] - this.la[1];
        var z2 = this.lb[2] - this.la[2];
        var xx = x2;
        var yy = y2;
        var zz = z2;
        var x = Math.pow(xx, 2);
        var y = Math.pow(yy, 2);
        var z = Math.pow(zz, 2);
        var xyz = (x + y + z);
        var de = Math.sqrt(xyz);
        de = de * 10000;
        de = Math.round(de);
        de = Math.floor(de);
        de = de / 10000;
        var dE = de;
        return dE;
    };
    return DeltaE;
}());
 



var Converter = (function () {
    function Converter() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.r = this.r;
        this.g = this.g;
        this.b = this.b;
    }
    Converter.Hsl = function (x, y, z) {
        if (x < 0) {
            x = 0;
            console.info("[ATTENZIONE] la variabile R viene considerata pari a 0");
        }
        if (x > 255) {
            x = 255;
            console.info("[ATTENZIONE] la variabile R viene considerata pari a 255");
        }
        if (y < 0) {
            y = 0;
            console.info("[ATTENZIONE] la variabile G viene considerata pari a 0");
        }
        if (y > 255) {
            y = 255;
            console.info("[ATTENZIONE] la variabile G viene considerata pari a 255");
        }
        if (z < 0) {
            z = 0;
            console.info("[ATTENZIONE] la variabile B viene considerata pari a 0");
        }
        if (z > 255) {
            z = 255;
            console.info("[ATTENZIONE] la variabile B viene considerata pari a 255");
        }
        var x1;
        var y1;
        var z1;
        x1 = x / 255;
        y1 = y / 255;
        z1 = z / 255;
        var max1 = Math.max(x1, y1);
        var max = Math.max(max1, z1);
        var min1 = Math.min(x1, y1);
        var min = Math.min(min1, z1);
        var luminosita = ((max + min) / 2) * 100;
        var saturazione = 0;
        var tonalita = 0;
        if ((x1 === y1 && x1 === z1) && y1 === z1) {
            saturazione = 0;
            tonalita = 0;
        }
        else {
            if (luminosita <= 50) {
                saturazione = (max - min) / (max + min) * 100;
            }
            else {
                saturazione = (max - min) / (2 - max - min) * 100;
            }
            if (max === x1) {
                tonalita = (y1 - z1) / (max - min);
            }
            else if (max === y1) {
                tonalita = 2.0 + (z1 - x1) / (max - min);
            }
            else if (max === z1) {
                tonalita = 4.0 + (x1 - y1) / (max - min);
            }
            tonalita *= 60;
            if (tonalita < 0) {
                tonalita += 360;
            }
            if (tonalita > 360) {
                tonalita = 360;
            }
        }
        var h1 = tonalita;
        var s1 = saturazione;
        var l1 = luminosita;
        var hh = h1;
        var ss = s1;
        var ll = l1;
        hh = hh * 100;
        ss = ss * 100;
        ll = ll * 100;
        hh = Math.round(hh);
        ss = Math.round(ss);
        ll = Math.round(ll);
        hh = Math.floor(hh);
        ss = Math.floor(ss);
        ll = Math.floor(ll);
        hh = hh / 100;
        ss = ss / 100;
        ll = ll / 100;
        var h = hh;
        var s = ss;
        var l = ll;
        var hsl = [h, s, l];
        console.info("Formato HSL:");
        console.info("tonalit\ufffd\ufffd: " + hsl[0] + " - saturazione: " + hsl[1] + " - luminosit\ufffd\ufffd: " + hsl[2]);
        return hsl;
    };
    Converter.CieLab = function (R, G, B) {
        var r;
        var g;
        var b;
        var X;
        var Y;
        var Z;
        var fx;
        var fy;
        var fz;
        var xr;
        var yr;
        var zr;
        var ls;
        var as;
        var bs;
        var eps = 216.0 / 24389.0;
        var k = 24389.0 / 27.0;
        var Xr = 0.9504;
        var Yr = 1.0;
        var Zr = 1.0888;
        r = R / 255.0;
        g = G / 255.0;
        b = B / 255.0;
        if (r <= 0.04045)
            r = r / 12.92;
        else
            r = Math.pow((r + 0.055) / 1.055, 2.4);
        if (g <= 0.04045)
            g = g / 12.92;
        else
            g = Math.pow((g + 0.055) / 1.055, 2.4);
        if (b <= 0.04045)
            b = b / 12.92;
        else
            b = Math.pow((b + 0.055) / 1.055, 2.4);
        X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
        Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
        Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
        var xyz = [X, Y, Z];
        xr = X / Xr;
        yr = Y / Yr;
        zr = Z / Zr;
        if (xr > eps)
            fx = Math.pow(xr, 1 / 3.0);
        else
            fx = ((k * xr + 16.0) / 116.0);
        if (yr > eps)
            fy = Math.pow(yr, 1 / 3.0);
        else
            fy = ((k * yr + 16.0) / 116.0);
        if (zr > eps)
            fz = Math.pow(zr, 1 / 3.0);
        else
            fz = ((k * zr + 16.0) / 116.0);
        ls = (116 * fy) - 16;
        as = 500 * (fx - fy);
        bs = 200 * (fy - fz);
        var hh = ls;
        var ss = as;
        var ll = bs;
        hh = hh * 100;
        ss = ss * 100;
        ll = ll * 100;
        hh = Math.round(hh);
        ss = Math.round(ss);
        ll = Math.round(ll);
        hh = Math.floor(hh);
        ss = Math.floor(ss);
        ll = Math.floor(ll);
        hh = hh / 100;
        ss = ss / 100;
        ll = ll / 100;
        var lss = hh;
        var ass = ss;
        var bss = ll;
        var lab = [lss, ass, bss];
        //console.info("Formato CIE LAB:");
        //console.info("L: " + lab[0] + " - A: " + lab[1] + " - B: " + lab[2]);
        return lab;
    };
    Converter.hslToLab = function (h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        var r;
        var g;
        var b;
        if (s === 0.0) {
            r = g = b = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = Converter.hueToRgb(p, q, h + 1.0 / 3.0);
            g = Converter.hueToRgb(p, q, h);
            b = Converter.hueToRgb(p, q, h - 1.0 / 3.0);
        }
        r = r * 255;
        g = g * 255;
        b = b * 255;
        var rgb = [r, g, b];
        var X;
        var Y;
        var Z;
        var fx;
        var fy;
        var fz;
        var xr;
        var yr;
        var zr;
        var ls;
        var as;
        var bs;
        var eps = 216.0 / 24389.0;
        var k = 24389.0 / 27.0;
        var Xr = 0.9504;
        var Yr = 1.0;
        var Zr = 1.0888;
        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;
        if (r <= 0.04045)
            r = r / 12.92;
        else
            r = Math.pow((r + 0.055) / 1.055, 2.4);
        if (g <= 0.04045)
            g = g / 12.92;
        else
            g = Math.pow((g + 0.055) / 1.055, 2.4);
        if (b <= 0.04045)
            b = b / 12.92;
        else
            b = Math.pow((b + 0.055) / 1.055, 2.4);
        X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
        Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
        Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
        var xyz = [X, Y, Z];
        xr = X / Xr;
        yr = Y / Yr;
        zr = Z / Zr;
        if (xr > eps)
            fx = Math.pow(xr, 1 / 3.0);
        else
            fx = ((k * xr + 16.0) / 116.0);
        if (yr > eps)
            fy = Math.pow(yr, 1 / 3.0);
        else
            fy = ((k * yr + 16.0) / 116.0);
        if (zr > eps)
            fz = Math.pow(zr, 1 / 3.0);
        else
            fz = ((k * zr + 16.0) / 116.0);
        ls = (116 * fy) - 16;
        as = 500 * (fx - fy);
        bs = 200 * (fy - fz);
        var hh = ls;
        var ss = as;
        var ll = bs;
        hh = hh * 100;
        ss = ss * 100;
        ll = ll * 100;
        hh = Math.round(hh);
        ss = Math.round(ss);
        ll = Math.round(ll);
        hh = Math.floor(hh);
        ss = Math.floor(ss);
        ll = Math.floor(ll);
        hh = hh / 100;
        ss = ss / 100;
        ll = ll / 100;
        var lss = hh;
        var ass = ss;
        var bss = ll;
        var lab = [lss, ass, bss];
        return lab;
    };
    
    Converter.hueToRgb = function (p, q, t) {
        if (t < 0.0)
            t += 1.0;
        if (t > 1.0)
            t -= 1.0;
        if (t < 1.0 / 6.0)
            return p + (q - p) * 6.0 * t;
        if (t < 1.0 / 2.0)
            return q;
        if (t < 2.0 / 3.0)
            return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
        return p;
    };

    function toFixed(num, fixed) {
    fixed = fixed || 0;
    fixed = Math.pow(10, fixed);
    return Math.floor(num * fixed) / fixed;
}
    Converter.hslToRgb = function (h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        var r;
        var g;
        var b;
        if (s === 0.0) {
            r = g = b = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = Converter.hueToRgb(p, q, h + 1.0 / 3.0);
            g = Converter.hueToRgb(p, q, h);
            b = Converter.hueToRgb(p, q, h - 1.0 / 3.0);
        }
        r = r * 255;
        g = g * 255;
        b = b * 255;
        r = toFixed(r,2);
        g= toFixed(g,2);
        b = toFixed(b,2);
        var rgb = [r, g, b];
        return rgb;
    };
    return Converter;
}())

module.exports = { deltaEdaRgb : function(x ,y){
 var a = Converter.CieLab(x[0],x[1],x[2]);
 var b = Converter.CieLab(y[0],y[1],y[2]);
 var colori = new DeltaE(a,b);
return colori.getDeltaE();
 
 
}}