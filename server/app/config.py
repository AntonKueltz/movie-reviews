from binascii import unhexlify
from os import environ

if environ.get("MOVIE_SERVER_ENV") == "prod":
    origins = [
        "https://antonkueltz.com",
    ]
    # do not add a default value to get() as this should fail if there is no env defined key
    app_key = unhexlify(environ.get("MOVIE_SERVER_SECRET_KEY"))
else:
    origins = [
        "http://localhost",
        "http://localhost:3000",
    ]
    app_key = b'\xd0\xac\t\x92\x9c\xf9\xf3z\x83\x84\xbcP\xe7I\x85W\xb4z\xde{\xfef\xa9\xedhXa\xdf \xb7\x10\xbb'