# bin/sh

echo "install of sync"

echo "https://listen80:Stock.12@gitee.com" > ~/.git-credentials
echo write git-credentials ok

git config --global credential.helper store
echo credential.helper store ok

git clone https://gitee.com/listen80/sync.git
echo ok