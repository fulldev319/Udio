from django.urls import path
from musicblob import views


urlpatterns = [
    path('fetch_songs', views.fetch_songs, name='fetch-songs'),
    path("static/<str:fname>", views.static, name="static"),
]
