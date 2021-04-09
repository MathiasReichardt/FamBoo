$tag = "1.0"

docker build . -t reimat/daux-famboo:$tag
if ($?) {
    docker push reimat/daux-famboo:$tag
}
