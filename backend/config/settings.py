from pathlib import Path
from decouple import config
from datetime import timedelta
import os

# ------------------------
# محیط: local یا production
ENVIRONMENT = config("ENVIRONMENT", default="local")

# ------------------------
# کلیدهای API
OPENAI_API_KEY = config("OPENAI_API_KEY", default="")

# ------------------------
# JWT Auth
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=5),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="django-insecure-key")
DEBUG = config("DEBUG", default=(ENVIRONMENT=="local"), cast=bool)

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "survey-backend.liara.run",
    "survey-ce.liara.run",
]

# ------------------------
INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'survey',
    'accounts',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ------------------------
# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",  # localhost Vite
    "http://localhost:5173",
    "https://survey-ce.liara.run",
    "https://survey-backend.liara.run",
]

ROOT_URLCONF = 'config.urls'

# ------------------------
# Templates (اضافه کردن build React)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend_dist"],  # index.html اینجاست
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]




WSGI_APPLICATION = 'config.wsgi.application'

# ------------------------
# Database
if ENVIRONMENT == "production":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME', default='surveydb'),
            'USER': config('DB_USER', default='liarauser'),
            'PASSWORD': config('DB_PASSWORD', default='liarapass'),
            'HOST': config('DB_HOST', default='survey-db'),
            'PORT': config('DB_PORT', default='5432'),
        }
    }
else:  # local
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# ------------------------
# اعتبارسنجی رمز عبور
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------------
# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_TZ = True

# ------------------------
# ------------------------
# STATIC
BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# فایل‌های استاتیک React
STATICFILES_DIRS = [
    BASE_DIR / "frontend_dist/assets",
]

# MEDIA
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# ------------------------
# Email
EMAIL_BACKEND = config("EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")

# ------------------------
# محیط متغیرها را برای Liara روی runtime بخوان
# (اگر ENV VAR در لیارا موجود باشد، مقادیر واقعی جایگزین پیش‌فرض‌ها می‌شوند)
