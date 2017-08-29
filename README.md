## Production

``` bash
# create image
docker build -t tw-web-prod-i .

# run container, and open localhost:8080
docker run -d --name tw-web-prod-app -p 8080:8080 tw-web-prod-i
```

## Development

``` bash
# can only create development image after production image "tw-web-prod-i" exists 
docker build -t tw-web-dev-i -f dev.dockerfile .

# run container, and open localhost:8080, edit code with hot-reload
docker run -d --name tw-web-dev-app -p 8080:8080 -v "$(pwd)":/var/app tw-web-dev-i
```

## License

MIT
