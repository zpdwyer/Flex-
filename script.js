/*
 RadioStream.html uses this javascript to play the next track. This script utilizees the soundcloud api and authenticating the api using the FLEX client_ID
 SOUNDCLOUD API: https://developers.soundcloud.com/docs/api/guide
 
 
 
 */
function load_sound(playlist_url) {
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm"
    SC.initialize({
                        client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    
    
    SC.get('/resolve', { url: playlist_url }, function(set) {
           //resolve allows us to obtaint each track id in the "set" or playlist
           $(set.tracks).each(function(i, track)
            {
                              var track_IDs = [];
                              //created new trak_ID stack
                              track_IDs.push(track.id);
                              //adding the specific track IDs to the stack
                              var is_playing = false;
                              
                              while(is_playing!=true)
                              {
                                var track_ID = track_IDs.pop();
                                //need to figure out how to randomly generate an index from 0 to however many elements the track_IDs stack contains. Then remove that track_id from the
                                //track_IDs stack.
                              
                                SC.stream('/tracks/' + track_ID, {volume:50, onfinish:is_playing=false}, function(sound)
                                    //soundcloud method to stream the selected song using the track_id
                                          {
                                                is_playing = true;
                                                sound.play();
                                                document.getElementById("start").onclick = function()
                                          });
                                }
                });
           });
}

/*........................IGNORE CODE...................................................................................
    
 
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
