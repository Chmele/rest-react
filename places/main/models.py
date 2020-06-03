# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

class Comment(models.Model):
    text = models.TextField()
    mark = models.IntegerField(blank=True, null=True)
    place = models.ForeignKey('Place', models.CASCADE, blank=True, null=True)
    author = models.ForeignKey(User, models.CASCADE)

    class Meta:
        managed = False
        db_table = 'main_comment'
        unique_together = (('author', 'place'),)


class Place(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    type = models.ForeignKey('Placetype', models.CASCADE)

    def no_of_ratings(self):
        ratings = Comment.objects.filter(place = self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Comment.objects.filter(place = self)
        for r in ratings:
            sum += r.mark
            #print(r.mark)
        if self.no_of_ratings() == 0:
            return 0;
        return sum/self.no_of_ratings()

    def typename(self):
        return self.type.typename

    class Meta:
        managed = False
        db_table = 'main_place'


class Placecard(models.Model):
    pic = models.ImageField(upload_to='cards')
    text = models.TextField()
    place = models.ForeignKey(Place, models.CASCADE)

    class Meta:
        managed = False
        db_table = 'main_placecard'


class Placetype(models.Model):
    typename = models.TextField()

    class Meta:
        managed = False
        db_table = 'main_placetype'
