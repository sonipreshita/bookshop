
//deletemovie() use for delete movie
function deletemovie() {
    console.log(this[0].getAttribute('data-movie-id'));
    location.href = "/movies/delete/"+this[0].getAttribute('data-movie-id');
}

//deletesong() use for delete song
function deletesong() {
    console.log(this[0].getAttribute('data-song-id'));
    location.href = "/songs/delete/"+this[0].getAttribute('data-song-id');
}

function deleteactor() {
    location.href = "actors/delete/"+this[0].getAttribute('data-actor-id');
}

function deleteproducer() {
    console.log(this[0].getAttribute('data-producers-id'));
    location.href = "producers/delete/"+this[0].getAttribute('data-producers-id');
}

function deletewriter() {
    location.href = "writers/delete/"+this[0].getAttribute('data-writer-id');
}

function deletedirector() {
    console.log(this[0].getAttribute('data-directors-id'));
    location.href = "/directors/delete/"+this[0].getAttribute('data-directors-id');
}

function deletecomment() {
    console.log(this[0].getAttribute('data-comment-id'));
    console.log(this[0])
    console.log(this[0].getAttribute('data-movie-id'))
    location.href = "/movies/comment/delete/"+this[0].getAttribute('data-movie-id')+"/"+this[0].getAttribute('data-comment-id');
    console.log(location.href)
}

function deleteCommentOnSong() {
    console.log(this[0].getAttribute('data-comment-id'));
    console.log(this[0])
    console.log(this[0].getAttribute('data-song-id'))
    location.href = "/comment/delete/"+this[0].getAttribute('data-song-id')+"/"+this[0].getAttribute('data-comment-id');
    console.log(location.href)
}


