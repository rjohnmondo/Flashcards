var fs = require("fs");

function ClozeCard(text, cloze){
    this.text = text;
    this.cloze = cloze;
    this.clozeDel = this.text.replace(this.cloze, '**********');
    this.create = function(){
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDel: this.clozeDel,
            type: "cloze"
        };

        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(err){
            if (err){
                console.log(err);
            }
        });
    };
}

module.exports = ClozeCard;