import os

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import FileResponse
from .models import Song
from .serializers import SongSerializer


@api_view(['GET'])
def fetch_songs(request):
    query = request.GET.get('q', '')
    if query:
        songs = Song.objects.filter(title__icontains=query)
    else:
        songs = Song.objects.all()
    
    serializer = SongSerializer(songs, many=True)
    return Response({"songs": serializer.data}, headers={"Access-Control-Allow-Origin": "*"})


def static(request, fname):
    return FileResponse(
        open(os.path.join("musicblob/static", fname), "rb"),
        headers={"Accept-Ranges": "bytes"},
    )
