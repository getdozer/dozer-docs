### Build image with lite and push
```
cp .env.lite .env
yarn build

docker build . -t dozer-ui-lite
docker tag dozer-ui-lite:latest public.ecr.aws/getdozer/dozer-ui-lite:latest
docker push public.ecr.aws/getdozer/dozer-ui-lite:latest
```


# Run static 
```
docker run -p 3001:8080 dozer-ui-lite
```
