   /* SC.initialize({
           client_id: 'e37f3c1f5f6ba94620a84468518dc09d',
		   client_secret:'0a9faefe826ca4e0f8e5151cdcb10428',
  
  });
  
  
    var track_url = 'https://soundcloud.com/dancingastronaut/kygo-dillon-francis-feat-james-hersey-coming-over-original-mix';

   /*SC.stream('/tracks/200632015',function(sound) {
        $('#start').click(function(e) {
            e.preventDefault();
            sound.play();  
        }); 
        $('#stop').click(function(e) {
            e.precentDefualt(); 
            sound.pause();
        }); 
   });*/
function load_sound(playlist_url) {
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm"
    SC.initialize({
                        client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    
    
    SC.get('/resolve', { url: playlist_url }, function(set) {
           $(set.tracks).each(function(i, track)
            {
                              var track_IDs = [];
                              track_IDs.push(track.id);
                              var is_playing = false;
                              while(is_playing!=true)
                              {
                                var track_ID = track_IDs.pop();
                                SC.stream('/tracks/' + track_ID, {volume:50, onfinish:is_playing=false}, function(sound)
                                          {
                                                is_playing = true;
                                                sound.play();
                                                document.getElementById("start").onclick = function()
                                          });
                                }
                });
           });
}

/*
    SC.get('/resolve', {url: playlist_url}, function(set) {
           set.tracks
           SC.get('/resolve', {url:
           
           SC.stream("/tracks/" + track.id, {volume:50 } , function(sound) {
                     console.log(sound);
                     is_playing = true;
                     sound.play();
                     document.getElementById("start").onclick = function(){
                     if(is_playing === false){
                     sound.resume();
                     is_playing = true;
                     } else if(is_playing === true){
                     sound.pause();
                     is_playing = false;
                     }
                     };
                     
                     document.getElementById("stop").onclick = function(){
                     sound.stop();
                     load_sound("https://www.soundcloud.com/chancetherapper/chain-smoker");
                     };
                     
                     
                     })
                  
                  });
           
           
           
                  
}


function playNextSound(){
    
    load_sound("https://soundcloud.com/dancingastronaut/kygo-dillon-francis-feat-james-hersey-coming-over-original-mix");
}*/
