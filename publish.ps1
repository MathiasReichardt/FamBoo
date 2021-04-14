$tag = "1.1"
docker build . -t reimat/daux-famboo:$tag
if ($?) {
    docker push reimat/daux-famboo:$tag
    
    # also update latest
    docker tag reimat/daux-famboo:$tag reimat/daux-famboo:latest
    docker push reimat/daux-famboo:latest
}
