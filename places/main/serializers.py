from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'type', 'name', 'typename', 'no_of_ratings', 'avg_rating')


class PlacetypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placetype
        fields = ('id', 'typename')


class PlacecardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placecard
        fields = ('id', 'pic', 'text', 'place')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'text', 'mark', 'place', 'author')