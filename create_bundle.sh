TMP_DIR=/tmp/extension
BUNDLE_NAME=extension.zip

rm -rf $TMP_DIR
mkdir $TMP_DIR
cp *.js *.css *.html *.png manifest.json $TMP_DIR
zip -j $BUNDLE_NAME $TMP_DIR/*
rm -rf $TMP_DIR
