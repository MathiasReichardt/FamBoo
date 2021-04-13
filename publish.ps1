$tag = "1.1"

docker build . -t reimat/daux-famboo:$tag
if ($?) {
    docker push reimat/daux-famboo:$tag
}
