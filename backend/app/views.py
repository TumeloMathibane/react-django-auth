from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView


# Registration View
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = (request.data.get("username") or "").strip()
        password = request.data.get("password") or ""
        email = (request.data.get("email") or "").strip()

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username__iexact=username).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        if email and User.objects.filter(email__iexact=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username, password=password, email=email
        )
        user.save()
        return Response(
            {"message": "User registered successfully"}, status=status.HTTP_201_CREATED
        )


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


# Protected Route Example
from rest_framework.permissions import IsAuthenticated


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = {
            "username": request.user.username,
            "email": request.user.email,
            "password": request.user.password,
        }
        # print(f'Request user: {user}')
        return Response(
            {"message": "You are authenticated", "user": user},
            status=status.HTTP_200_OK,
        )


class RefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")
        # print(f"Refresh token: {refresh}")
        new_token = RefreshToken(refresh).access_token
        # print(f"New token: ...{new_token}")
        return Response(
            {"message": "You are authenticated", "new_token": str(new_token)},
            status=status.HTTP_200_OK,
        )
