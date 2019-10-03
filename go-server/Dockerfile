FROM golang:latest as builder
ADD . /app
WORKDIR /app
RUN go mod download

RUN go get -u github.com/go-swagger/go-swagger/cmd/swagger
RUN swagger generate server -A it-stone -P models.Token

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/it-stone-server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8090
CMD ["./main", "--port=8090", "--host=0.0.0.0"]