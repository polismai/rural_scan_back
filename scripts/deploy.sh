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
sudo yarn install

echo "Build app and run"
sudo yarn pm2:deploy:app