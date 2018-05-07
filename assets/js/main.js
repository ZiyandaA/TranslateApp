var GoogleTranslateApiUrl = 'https://translation.googleapis.com/language/translate/v2';
var GoogleTextToSpeechApiUrl = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent'
var googleKey = 'AIzaSyDgiqOa-565SRqsU6x4EFE9E2ZUzDCyrls';
var audio;
$(document).ready(function(){
    $('.translateButton').click(function(e){
        e.preventDefault();
            var inputValue = $('.inputText').val();
            var targetLanguage = $('.inputLanguageCode option:selected').val();
            var languageCode = $('.inputLanguageCode option:selected').data('code');

            if(inputValue!=""){
                
                if (/[#@\!\$]/.test(inputValue)) { // If any of the characters #@!$ are in the input...
                    // Show the error message here 
                        $("#error").show();
                        $(".translated_text").text("")
                        return;
                  }
                  else{ 
                  $("#error").hide();
            

                var requestUrl =GoogleTranslateApiUrl + "?key=" + googleKey +"&q="+inputValue+"&target="+targetLanguage;
                $.ajax({
                    url: requestUrl
                }).done(function(response){
                    if(response.data != undefined && response.data['translations']!=undefined){
                        if(response.data['translations'][0]['translatedText']!=undefined){
                            var trasnlation = response.data['translations'][0]['translatedText'];
                            $('.translated_text').text(trasnlation);
                            $('.outputText').removeClass("hide").attr("aria-hidden", "false")
                        
                            textToSpeech(trasnlation,languageCode);
                        
                        }
                    }
                    
           });
            }
        }
    });
      
    


    //
    //$('.speaker').click(function(){
    // audio.play();
    //});

});

function textToSpeech(inputText,languageCode){
    var requestUrl = GoogleTextToSpeechApiUrl + "&key="+ googleKey;
    $.ajax({
        url: requestUrl,
        method: 'POST',
        data: JSON.stringify({
            'input':{
              'text':inputText
            },
            'voice':{
              'languageCode':languageCode,
              'ssmlGender':'FEMALE'
            },
            'audioConfig':{
              'audioEncoding':'MP3'
            }
          }),
          contentType: "application/json; charset=utf-8",
          dataType   : "json",
          error: function(res){
              console.log(res.responseText)
              $(".AudioButton").removeClass("btn-success").addClass("hide").off("click");
          }
    }).done(function(response){ console.log(response)
        audio = new Audio("data:audio/wav;base64," + response.audioContent);
        // console.log(response.audioContent);
        console.log(response)
        audio.play();
        $(".AudioButton").removeClass("hide").addClass("btn-success").text("Play Audio").on("click", function(){audio.play()});
        $("InputValue").removeid("error")
    });
}
