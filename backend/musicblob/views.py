import os

from django.http import FileResponse, JsonResponse

from musicblob import models

from django.contrib import auth


def all_songs(request):
    songs = models.Song.objects.all()
    songs_json = {
        "songs": [
            {
                "title": s.title,
                "artist": s.artist,
                "song_path": s.song_path,
                "album_art_path": s.album_art_path,
            }
            for s in songs
        ]
    }
    return JsonResponse(songs_json, headers={"Access-Control-Allow-Origin": "*"})


def static(request, fname):
    return FileResponse(
        open(os.path.join("musicblob/static", fname), "rb"),
        headers={"Accept-Ranges": "bytes"},
    )
