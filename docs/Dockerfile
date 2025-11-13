# -------- Stage 1: Build --------
FROM debian:trixie-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY ./.distro/hugo_extended_withdeploy_0.145.0_linux-amd64.deb /tmp/package.deb
RUN dpkg -i /tmp/package.deb && rm -f /tmp/package.deb

WORKDIR /var/www
COPY . .

RUN hugo \
    --source docs \
    --destination /build \
    --enableGitInfo

# -------- Stage 2: Serve --------
FROM nginx:stable-alpine3.21-slim AS production

WORKDIR /usr/share/nginx/html

COPY --chown=nginx:nginx --from=builder /build ./

COPY --chown=nginx:nginx nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx scripts/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx

USER nginx

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
