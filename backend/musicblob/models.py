from django.db import models


class Song(models.Model):
    title = models.CharField(max_length=64)
    artist = models.CharField(max_length=64)
    album_art_path = models.CharField(max_length=128)
    song_path = models.CharField(max_length=128)
