# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Comment)
admin.site.register(Place)
admin.site.register(Placetype)
admin.site.register(Placecard)