import os

from django.http import FileResponse, JsonResponse
from django.http import JsonResponse
from .models import Song


def fetch_songs(request):
    query = request.GET.get('q', '')
    if query:
        songs = Song.objects.filter(title__icontains=query)
    else:
        songs = Song.objects.all()
    
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
