from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from LSTM_model import predict


class PredictionAPIView(GenericAPIView):
    def post(self, request, *args, **kwargs):
        pass