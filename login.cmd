echo "Logging in"

curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login

curl https://dev.stedi.me/validate/cbcd1836-138a-4294-92d9-771e224ae943


