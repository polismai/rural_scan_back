echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/rural_scan_back
echo "Update app from Git"
git fetch -u
git checkout staging
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo yarn install --frozen-lockfile

echo "Build app"
sudo yarn build

echo "Reload PM2 with the new application"
if [ -f dist/main.js ]; then
  echo "dist/main.js exists, proceeding with PM2 deployment"

  sudo pm2 start app.json
  sudo pm2 save
  sudo pm2 startup
  #sudo pm2 restart all
else
  echo "dist/main.js does not exist. Build may have failed."
fi

echo "Deployment complete"
