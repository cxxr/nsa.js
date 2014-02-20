function makeFancy(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function NSA(prefixes, suffixes) {
    this.prefixes = prefixes;
    this.suffixes = suffixes;
    this.singleFlip = 0.5;
    this.basicFlip = 0.3;
    this.romanFlip = 0.4;
    this.maxFancy = 20;
    this.random = Math.random;
}

NSA.prototype.getRand = function(words) {
    return words[Math.floor(this.random()*words.length)]; 
}

NSA.prototype.getSingle = function() {
    var ret;
    if (this.random() > this.singleFlip) {
        ret = this.getRand(this.prefixes);
    } else {
        ret = this.getRand(this.suffixes);
    }
    return ret.toUpperCase();
}

NSA.prototype.getBasicCodeName = function() {
    var rand_prefix = this.getRand(this.prefixes);
    var rand_suffix = this.getRand(this.suffixes);
    
    return (rand_prefix + rand_suffix).toUpperCase();
}

NSA.prototype.getFancyCodeName = function () {
    var single = this.getSingle();
    var num = Math.floor(this.random()*this.maxFancy + 2);
    return (single + "-" + makeFancy(num)).toUpperCase();
}

NSA.prototype.getCodeName = function() {
    if (this.random() > this.basicFlip) {
        return this.getBasicCodeName();
    } else {
        if (this.random() > this.romanFlip) {
            return this.getFancyCodeName();
        } else {
            return this.getSingle();
        }
    }
}

 
