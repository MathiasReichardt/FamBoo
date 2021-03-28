docker build . -t reimat/daux-famboo
if ($?) {
    docker push reimat/daux-famboo
}
