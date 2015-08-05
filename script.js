window.onload = function load_sound() {
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm";
    var choiceOneRef;
    var choiceTwoRef;
    var choiceRandom;
    
    SC.initialize({
                  client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    
    
    SC.get('/resolve', { url: playlist_url }, function(set) {
           var track_IDs = [];
           var voteCountArray=[];
           var firstPlay=true;
           var num;
           var max;
           var count=0;
           var winner;
           var x=0;
           var userRef = new Firebase("https://flex.firebaseio.com/users");
           var authData = userRef.getAuth();
           var userID;
           var votesLeftRef;
           $(set.tracks).each(function(i, track) {
                              track_IDs.push(track.id);
                              });
           var track_ID;
           track_ID = track_IDs.pop();
           var Song_Choices = [];
           var is_playing = false;
           var nextSongs = [];
           max = track_IDs.length;
           if(firstPlay!==false)
           {
           
           while(count < 3)
           {
                                            max = track_IDs.length;
											num = Math.floor(Math.random() * (max - 0) + 0);
											Song_Choices.push(track_IDs[num]);
                                            count++;
           }
           firstPlay=false;
           Song_Choices = load_Songs(Song_Choices, max, track_IDs);
           count=0;
           }
           while(count<=track_IDs.length)
           {
           
           if(firstPlay===false)
           {
           nextSongs.push(track_IDs[Song_Choices[0]]);
           nextSongs.push(track_IDs[Song_Choices[1]]);
           nextSongs.push(track_IDs[Song_Choices[2]]);
           load_Songs(nextSongs, max, track_IDs);
           }
           
           playSong(track_ID);
           
           
           userID = authData.uniqueID;
           votesLeftRef = userRef.child(userID + '/votesLeft');
           votesLeftRef.set(1);
           
           winner = voteCount();
           
           track_ID = track_IDs[songChoices[winner]];
           
           if(is_playing===false)
           {
           while(num < 3)
           {
                                            max = track_IDs.length;
											num = Math.random() * (max - 0) + 0;
											Song_Choices.push(track_IDs.getValue(num));
           }
           load_Songs(Song_Choices, max, track_IDs);
           }
           count++;
           }
           
           }
           
           );
};
/*function load_Songs(songChoices){
    SC.initialize({
                  client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    this.songChoices=songChoices;
    var choice1 = songChoices[0];
    var choice2 = songChoices[1];
    var choice3 = songChoices[2];
    
        SC.get('/tracks/' + choice1, function(track){
               document.getElementById("Choice1").innerHTML = track.title;
        });
    
    SC.get('/tracks/' + choice2, function(track){
           console.log(track.title);
           document.getElementById("Choice2").innerHTML = track.title;
           });
}*/


function playSong(track_ID)
{
    is_playing = true;
    this.track_ID=track_ID;
    SC.stream('/tracks/' + track_ID, {volume:00, onfinish:is_playing=false}, function(sound){
    sound.play();
    var userRef = new Firebase("https://flex.firebaseio.com/users");
    var authData = userRef.getAuth();
    var votingRef = new Firebase("https://flex.firebaseio.com/songChoices");
    choiceOneRef = votingRef.child('/Choice_1');
    choiceOneRef.set(0);
    choiceTwoRef = votingRef.child('/Choice_2');
    choiceTwoRef.set(0);
    choiceRandom = votingRef.child('/Random');
    choiceRandom.set(0);
    if(authData)
    {
        var userID = authData.uniqueID;
        var votesLeftRef = userRef.child(userID + '/votesLeft');
        var votesLeft = votesLeftRef.val();
        if(votesLeft!==0)
        {
            document.getElementById("Choice1").onclick = function()
            {
                choiceOneRef.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
                
            };
            document.getElementById("Choice2").onclick = function()
            {
                choiceTwoRef.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
            };
            document.getElementById("Random").onclick = function()
            {
                choiceRandom.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
            };
        }
    }
              });
    
}

function voteCount(){
    var votingRef = new Firebase("https://flex.firebaseio.com/songChoices");
    var count=0;
    choiceOneRef = votingRef.child('/Choice_1');
    choiceTwoRef = votingRef.child('/Choice_2');
    choiceRandom = votingRef.child('/Random');
    voteCountArray.push(choiceOneRef.val());
    voteCountArray.push(choiceTwoRef.val());
    voteCountArray.push(choiceRandom.val());
    var max = Math.max.apply(Math, voteCountArray);
    var winner=0;
    while(count<voteCountArray.length)
    {
        if(max === voteCountArray[count])
        {
            winner = count;
        }
        count++;

    }
    return winner;
    

}

function load_Songs(songChoices, max, track_IDs){
    SC.initialize({
                  client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    this.songChoices=songChoices;
    this.max=max;
    this.track_IDs=track_IDs;
    var choice1 = songChoices[0];
    var choice2 = songChoices[1];
    var choice3 = songChoices[2];
    var num;
    
    var song1 = SC.get('/tracks/' + choice1, function(track){
           return track.title;
           });
    
    var song2 = SC.get('/tracks/' + choice2, function(track){
                       
                       return track.title;
           });
    var song3 = SC.get('/tracks/' + choice3, function(track){
                       return track.title;
                       });
    //console.log(song1);
    console.log("test");
    while(song1 === 'undefined')
    {
        num = Math.floor(Math.random() * (max - 0) + 0);
        choice1 = track_IDs[num];
        song1 = SC.get('/tracks/' + choice1, function(track){
                           return track.title;
                           });
        
    }
    document.getElementById("Choice1").innerHTML = song1;
    while(song2 === 'undefined')
    {
        num = Math.floor(Math.random() * (max - 0) + 0);
        choice2 = track_IDs[num];
        song2 = SC.get('/tracks/' + choice2, function(track){
                           return track.title;
                           });
        
    }
    document.getElementById("Choice1").innerHTML = song2;
    while(song3 === 'undefined')
    {
        num = Math.floor(Math.random() * (max - 0) + 0);
        choice3 = track_IDs[num];
        song3 = SC.get('/tracks/' + choice3, function(track){
                           return track.title;
                           });
        
    }
    
    songChoices[0]= choice1;
    songChoices[1]= choice2;
    songChoices[2]= choice3;
    
    return songChoices;
    
}
