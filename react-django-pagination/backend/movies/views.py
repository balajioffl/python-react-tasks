from django.shortcuts import render

from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Movie
from .serializers import MovieSerializer


# Create your views here.


class MovieListAPIView(ListAPIView):

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    filter_backends = [SearchFilter, DjangoFilterBackend]

    search_fields = ['title', 'description']

    filterset_fields = ['category', 'rating']
