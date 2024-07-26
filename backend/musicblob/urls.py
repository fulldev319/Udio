from django.urls import path

from musicblob import views

urlpatterns = [
    path("all_songs", views.all_songs, name="all_songs"),
    path("static/<str:fname>", views.static, name="static"),
]
