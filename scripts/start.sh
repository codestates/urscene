#!/bin/bash
cd /home/ubuntu/urscene/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_DATABASE --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export ENCRYPTION_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names ENCRYPTION_KEY --query Parameters[0].Value | sed 's/"//g')
export JWT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_SCOPE_URI=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_SCOPE_URI --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_GRANT_TYPE=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_GRANT_TYPE --query Parameters[0].Value | sed 's/"//g')
export KAKAOID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAOID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export KMDB_API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KMDB_API_KEY --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js