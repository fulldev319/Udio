import os

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.paginator import Paginator
from django.http import FileResponse
from .models import Song
from .serializers import SongSerializer


@api_view(['GET'])
def fetch_songs(request):
    query = request.GET.get('q', '')
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 20))

    if query:
        songs = Song.objects.filter(title__icontains=query)
    else:
        songs = Song.objects.all()
    
    paginator = Paginator(songs, limit)
    paginated_songs = paginator.get_page(page)
    
    serializer = SongSerializer(paginated_songs, many=True)
    
    return Response({
        "songs": serializer.data,
        "total_pages": paginator.num_pages,
        "current_page": page
    })


def static(request, fname):
    return FileResponse(
        open(os.path.join("musicblob/static", fname), "rb"),
        headers={"Accept-Ranges": "bytes"},
    )
