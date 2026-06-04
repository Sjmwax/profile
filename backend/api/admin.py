from django.contrib import admin
from .models import Portfolio, Skill, Project, Experience, Education, Message


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'updated_at']
    search_fields = ['name', 'email']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category']
    search_fields = ['name']
    ordering = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'featured', 'start_date']
    list_filter = ['category', 'status', 'featured']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'start_date', 'end_date', 'current']
    list_filter = ['current', 'company']
    search_fields = ['company', 'position']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree', 'field', 'start_date', 'end_date']
    list_filter = ['institution', 'degree']
    search_fields = ['institution', 'degree', 'field']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'email', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
