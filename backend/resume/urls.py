from django.urls import path
from .views import UploadResume, ViewAllData, DeleteAllData, RegisterView, Dashboard, AdminLogin, LogoutView, UploadUserData
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('upload', UploadResume.as_view(), name='upload'),
    path('viewalldata', ViewAllData.as_view(), name='viewall'),
    path('deletealldata', DeleteAllData.as_view(), name='deleteall'),
    path('register', RegisterView.as_view(), name='register'),
    path('adminlogin', AdminLogin.as_view(), name='adminlogin'),
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('dashboard', Dashboard.as_view(), name='dashboard'),
    path('updatescore', UploadUserData.as_view(), name='updatescore'),
    # path('admin/listall', ListAll.as_view(), name='listall'),
]