#!/bin/sh

set -e

echo "[entrypoint] Generating /usr/share/nginx/html/js/config.js..."

cat <<EOF > /usr/share/nginx/html/js/config.js
window.__CONFIG__ = {
  PLANTUML_URL: "${PLANTUML_URL:-https://www.plantuml.com/plantuml/svg/}",
  BASE_URL: "${BASE_URL:-https://arch-docs.synax.ru/}"
};
EOF

echo "[entrypoint] Starting nginx..."
exec "$@"
