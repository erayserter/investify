import numpy as np
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from prediction.Model import model


class PredictionAPIView(GenericAPIView):
    def post(self, request, *args, **kwargs):
        res = model.predict()
        return Response(res, status=status.HTTP_200_OK)