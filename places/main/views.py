# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import *
from .serializers import *



# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class PlaceTypeViewSet(viewsets.ModelViewSet):
    queryset = Placetype.objects.all()
    serializer_class = PlacetypeSerializer
    permission_classes = (AllowAny,)


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny,)

    @action(detail=True, methods=['POST'])
    def rate_place(self, request, pk=None):
        if 'mark' in request.data:

            place = Place.objects.get(id=pk)
            mark = request.data['mark']
            if 'text'in request.data:
                text = request.data['text']
            else:
                text = ''
            user = request.user

            try:
                comment = Comment.objects.get(author=user.id, place=place.id)
                comment.mark = mark
                comment.text = text
                comment.save()
                serializer = CommentSerializer(comment, many=False)
                response = {'message': 'Comment updated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                comment = Comment.objects.create(author=user, place=place, mark=mark, text=text)
                serializer = CommentSerializer(comment, many=False)
                response = {'message': 'Comment created', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'message': 'You need to provide mark'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny,)

    def update(self, request, *args, **kwargs):
        response = {'message': 'You cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'You cant create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)