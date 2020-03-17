#!/bin/bash

aws s3 sync ./src s3://wakaranai-but-wakaru.cc --exact-timestamps --delete --exclude "*.html" --exclude "*.woff2" --cache-control max-age=31536000
aws s3 sync ./src s3://wakaranai-but-wakaru.cc --exact-timestamps --delete --exclude "*" --include "*.woff2" --cache-control max-age=31536000 --content-type font/woff2
aws s3 sync ./src s3://wakaranai-but-wakaru.cc --exact-timestamps --delete --exclude "*" --include "*.html" --cache-control no-store
aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"
