function load_sound(playlist_url) { 
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm" 
    SC.initialize({ 
                         client_id: 'e37f3c1f5f6ba94620a84468518dc09d' 
                   }); 
      
      
     SC.get('/resolve', { url: playlist_url }, function(set) { 
            $(set.tracks).each(function(i, track) 
             { 
							   var count = 0; 
                               var track_IDs = []; 
							   var Song_Choices = [];
                               track_IDs.push(track.id); 
                               var is_playing = false; 
							   var nextSongs = [];
                               while(is_playing!=true) 
                               { 
									
									nextSongs.push(track_IDs.getValue(Song_Choices.pop())); 
									nextSongs.push(track_IDs.getValue(Song_Choices.pop()));
									nextSongs.push(track_IDs.getValue(Song_Choices.pop()));
									load_Songs(nextSongs);
									
									SC.stream('/tracks/' + track_ID, {volume:50, onfinish:is_playing=false}, function(sound) 
                                           { 
                                                 is_playing = true; 
                                                 sound.play(); 
                                                 document.getElementById("start").onclick = function() 
                                           }); 
									Vote_Count(); 
									if(is_playing===false)
									{
										while(num < 3)
										{
											var randomNum = Math.random() * (max - min) + min;
											Song_Choices.push(randomNum);
											load_Songs(Song_Choices); 
										}
									}
                                } 
                 }); 
            }); 
 } 
 
 function load_Songs(songChoices){
	 
	 this.songChoices=songChoices; 
	 var choice1 = songChoices[0];
	 var choice2 = songChoices[1];
	 var choice3 = songChoices[2];
	 document.getElementById("Choice1").innerHTML = choice1;
	 document.getElementById("Choice2").innerHTML = choice2;
 }
 
 function Vote_Count(){
	 
 
 }
