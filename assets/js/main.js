var GoogleTranslateApiUrl = 'https://translation.googleapis.com/language/translate/v2';
var GoogleTextToSpeechApiUrl = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent'
var googleKey = 'AIzaSyDgiqOa-565SRqsU6x4EFE9E2ZUzDCyrls';
$(document).ready(function(){
    $('.translateButton').click(function(e){
        e.preventDefault();
            var inputValue = $('.inputText').val();
            var targetLanguage = $('.inputLanguageCode option:selected').val();
            console.log(targetLanguage);
            if(inputValue!=""){
                var requestUrl =GoogleTranslateApiUrl + "?key=" + googleKey +"&q="+inputValue+"&target="+targetLanguage;
                $.ajax({
                    url: requestUrl
                }).done(function(response){
                    if(response.data != undefined && response.data['translations']!=undefined){
                        if(response.data['translations'][0]['translatedText']!=undefined){
                            var trasnlation = response.data['translations'][0]['translatedText'];
                            $('.outputText').text(trasnlation);
                            textToSpeech(trasnlation);
                        }
                    }
                    
                });
            }
    });
});

function textToSpeech(inputText){
    var requestUrl = GoogleTextToSpeechApiUrl + "&key="+ googleKey;
    $.ajax({
        url: requestUrl,
        method: 'POST',
        data: JSON.stringify({
            'input':{
              'text':'Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets.'
            },
            'voice':{
              'languageCode':'en-gb',
              'name':'en-GB-Standard-A',
              'ssmlGender':'FEMALE'
            },
            'audioConfig':{
              'audioEncoding':'MP3'
            }
          }),
          contentType: "application/json; charset=utf-8",
          dataType   : "json",
    }).done(function(response){
        console.log(response);
    });
}
