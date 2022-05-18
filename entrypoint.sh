#!/bin/sh

set -eu

echo "Current Env is $ENVIRONMENT"

if [ "dev" = "$ENVIRONMENT" ]; then
	pm2-runtime start pm2/test.json
else
	pm2-runtime start pm2/prod.json
fi
