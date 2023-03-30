from django.contrib.auth.models import User

example_users = [
    {
        "username": "albert-einstein",
        "email": "albert@einstein.me",
        "first_name": "Albert",
        "last_name": "Einstein",
        "secret": "pass1234"
    },
    {
        "username": "bill_hader",
        "email": "bill@hader.com",
        "first_name": "Bill",
        "last_name": "Hader",
        "secret": "pass1234"
    },
    {
        "username": "conan-obrian",
        "email": "conan@conan.com",
        "first_name": "Conan",
        "last_name": "O Brian",
        "secret": "pass1234"
    },
    {
        "username": "dwayne-the-rock",
        "email": "dwayne@rock.com",
        "first_name": "Dwayne",
        "last_name": "Johnson",
        "secret": "pass1234"
    },
    {
        "username": "EugeneLevy",
        "email": "eagene@levy.me",
        "first_name": "Eugene",
        "last_name": "Levy",
        "secret": "pass1234"
    },
]

for example_user in example_users:
    user = User.objects.create_user(
        username=example_user['username'],
        email=example_user['email'],
        first_name=example_user['first_name'],
        last_name=example_user['last_name'],
        password=example_user['secret']
    )

# Create the one superuser
User.objects.create_superuser(
    username='admin',
    email='admin@mail.com',
    first_name='Admin',
    last_name='User',
    password='pass1234'
)