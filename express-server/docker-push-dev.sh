HOST="acttaiwan.azurecr.io"
IMG_TAG="ustw-site-dev:latest"
USER="acttaiwan"
PASS=""

docker build -t $IMG_TAG . -f express-server/Dockerfile
docker login $HOST -u $USER -p $PASS
docker tag $IMG_TAG $HOST/$IMG_TAG
docker push $HOST/$IMG_TAG
