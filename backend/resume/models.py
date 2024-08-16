from django.db import models
from django.db import models
from django.contrib.auth.models import User

class UserAccount(models.Model):
    user = models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=100)
    rating = models.DecimalField(max_digits=20, decimal_places=3, default=1000)
    
class ResumeData(models.Model):
    uuid = models.CharField(max_length=100, null=False)
    data = models.JSONField()
    skill_score = models.IntegerField(default=0)
    completeness_score = models.IntegerField(default=0)
    academic_score = models.IntegerField(default=0)
    overall_score = models.IntegerField(default=0)
    test_score = models.IntegerField(default=0)

    def update_test_score(self, new_test_score):
        self.test_score = new_test_score
        self.save()
    
