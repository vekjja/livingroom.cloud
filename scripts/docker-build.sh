# docker login ghcr.io -u seemywingz -p $GITHUB_PAT

# Get the current git branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t ghcr.io/seemywingz/livingroom.cloud:$BRANCH \
    --push .
