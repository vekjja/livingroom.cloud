docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t ghcr.io/seemywingz/livingroom.cloud:develop \
    --push .
